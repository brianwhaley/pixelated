import React, { Component } from 'react';

class SocialCard extends Component {

    render() {
        return (
		    <div className="masonry-item" key={this.props.guid}>
			    <div className="card">
				    <div className="cardTitle">
                        <a href={this.props.link} target="_blank" rel="noopener noreferrer">
                        <img className="cardIcon" src={this.props.iconSrc} alt={this.props.iconSrcAlt} />
                        {this.props.title}
                        </a>
                    </div>
				    <div className="cardBody" dangerouslySetInnerHTML={{__html: this.props.content}} />
				    <div className="cardDate">{this.props.pubDate}</div>
				</div>
			</div>
        );
    }

}

export default SocialCard;
