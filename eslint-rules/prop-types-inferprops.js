/**
 * ESLint rule to enforce PropTypes + InferProps pattern for React components
 *
 * This rule ensures components follow the established pattern:
 * 1. Define PropTypes: Component.propTypes = { ... }
 * 2. Create InferProps type: export type ComponentType = InferProps<typeof Component.propTypes>
 * 3. Use inferred type in function signature: export function Component(props: ComponentType)
 */

import { isClientComponent } from '../src/components/utilities/functions.ts';

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce PropTypes + InferProps pattern for React components',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [], // no options
    messages: {
      missingPropTypes: 'Component "{{componentName}}" must define propTypes',
      missingInferProps: 'Component "{{componentName}}" must export a type using InferProps<typeof {{componentName}}.propTypes>',
      invalidInferProps: 'InferProps type for "{{componentName}}" must be named "{{componentName}}Type" and exported',
      missingInferPropsUsage: 'Component "{{componentName}}" function must use the InferProps type "{{componentName}}Type" as parameter type',
      propTypesPlacement: 'Component "{{componentName}}" propTypes must be defined immediately above the function declaration',
      inferPropsPlacement: 'Component "{{componentName}}" InferProps type must be defined immediately above the function declaration',
    },
  },

  create(context) {
    const components = new Map(); // Track components and their patterns

    function checkForInferProps(typeAnnotation) {
      if (!typeAnnotation) return false;
      
      if (typeAnnotation.type === 'TSTypeReference' && typeAnnotation.typeName?.name === 'InferProps') {
        return true;
      }
      
      if (typeAnnotation.type === 'TSIntersectionType') {
        return typeAnnotation.types.some(checkForInferProps);
      }
      
      return false;
    }

    function extractComponentNameFromInferProps(node) {
      // For our pattern of ComponentType = InferProps<typeof Component.propTypes>
      // We can simply remove 'Type' from the type name
      return node.id.name.replace('Type', '');
    }

    function reportViolations(component) {
      const { functionNode, hasPropTypes, hasInferProps, usesInferProps, inferPropsName, propTypesNode, inferPropsNode } = component;
      if (!functionNode) return; // Skip if function not found yet
      
      const componentName = functionNode.id.name;

      if (!hasPropTypes) {
        context.report({
          node: functionNode,
          messageId: 'missingPropTypes',
          data: { componentName },
        });
      }

      if (!hasInferProps) {
        context.report({
          node: functionNode,
          messageId: 'missingInferProps',
          data: { componentName },
        });
      }

      if (hasPropTypes && hasInferProps && !usesInferProps && functionNode.params.length > 0) {
        context.report({
          node: functionNode,
          messageId: 'missingInferPropsUsage',
          data: { componentName, inferPropsName },
        });
      }

      // Check placement and ordering: propTypes -> InferProps -> function (consecutive, no empty lines)
      if (hasPropTypes && hasInferProps && propTypesNode && inferPropsNode) {
        const propTypesEndLine = propTypesNode.loc.end.line;
        const inferPropsLine = inferPropsNode.loc.start.line;
        const functionLine = functionNode.loc.start.line;
        
        // InferProps must immediately follow propTypes (no empty lines)
        if (inferPropsLine !== propTypesEndLine + 1) {
          context.report({
            node: inferPropsNode,
            messageId: 'inferPropsPlacement',
            data: { componentName },
          });
        }
        
        // Function must immediately follow InferProps (no empty lines)
        if (functionLine !== inferPropsLine + 1) {
          context.report({
            node: functionNode,
            messageId: 'propTypesPlacement',
            data: { componentName },
          });
        }
      }
    }

    return {
      // Find component function declarations
      FunctionDeclaration(node) {
        if (node.id && node.id.name && node.parent.type === 'ExportNamedDeclaration') {
          const componentName = node.id.name;

          // Check if this is a client component (contains client-only patterns)
          const sourceCode = context.getSourceCode();
          const fileContent = sourceCode.text;
          if (componentName[0] === componentName[0].toUpperCase() && isClientComponent(fileContent)) {
            if (!components.has(componentName)) {
              components.set(componentName, {
                functionNode: node,
                hasPropTypes: false,
                hasInferProps: false,
                inferPropsName: `${componentName}Type`,
                usesInferProps: false,
                propTypesNode: null,
                inferPropsNode: null,
              });
            } else {
              // Component entry already exists (e.g., from propTypes), just update functionNode
              components.get(componentName).functionNode = node;
            }
          }
        }
      },

      // Find PropTypes assignments
      AssignmentExpression(node) {
        if (
          node.left.type === 'MemberExpression' &&
          node.left.object.type === 'Identifier' &&
          node.left.property.name === 'propTypes'
        ) {
          const componentName = node.left.object.name;
          if (!components.has(componentName)) {
            // Component might be declared later, create entry now
            components.set(componentName, {
              functionNode: null, // Will be set when function is found
              hasPropTypes: false,
              hasInferProps: false,
              inferPropsName: `${componentName}Type`,
              usesInferProps: false,
              propTypesNode: null,
              inferPropsNode: null,
            });
          }
          const component = components.get(componentName);
          component.hasPropTypes = true;
          component.propTypesNode = node;
        }
      },

      // Find InferProps type declarations
      TSTypeAliasDeclaration(node) {
        if (node.parent.type === 'ExportNamedDeclaration') {
          const componentName = extractComponentNameFromInferProps(node);
          if (componentName && components.has(componentName)) {
            const component = components.get(componentName);
            if (node.id.name === component.inferPropsName) {
              // Check if type annotation contains InferProps
              const hasInferProps = checkForInferProps(node.typeAnnotation);
              if (hasInferProps) {
                component.hasInferProps = true;
                component.inferPropsNode = node;
              }
            }
          }
        }
      },

      // Check function parameters
      'FunctionDeclaration:exit'(node) {
        if (node.id && components.has(node.id.name)) {
          const component = components.get(node.id.name);

          // Check if function uses the InferProps type
          if (node.params.length === 1) {
            const param = node.params[0];
            
            // Handle both direct type annotation and destructured parameters
            let paramTypeName = null;
            
            if (param.type === 'Identifier' && param.typeAnnotation?.typeAnnotation?.type === 'TSTypeReference') {
              // Direct parameter: (props: ComponentType)
              paramTypeName = param.typeAnnotation.typeAnnotation.typeName?.name;
            } else if (param.type === 'ObjectPattern' && param.typeAnnotation?.typeAnnotation?.type === 'TSTypeReference') {
              // Destructured parameter: ({ prop }: ComponentType)
              paramTypeName = param.typeAnnotation.typeAnnotation.typeName?.name;
            }
            
            if (paramTypeName === component.inferPropsName) {
              component.usesInferProps = true;
            }
          }

          // Report violations
          reportViolations(component);
        }
      },
    };
  },
};