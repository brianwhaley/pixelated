import React, { Component } from 'react';

import CalloutRoundSm from './callout-round-sm';
import CalloutHeader from './callout-header';

class SocialMedia extends Component {
    render() {
        return (
            
            <div>

            <div class="page-content-section" id="social-links-section">
                
                <div class="content-container callout">
                
                    <CalloutHeader title="Social Media Links" />
                    
                    <div class="row grid8 push2">
                    
                        <div class="grid6">
                            <CalloutRoundSm url="http://www.linkedin.com/in/brianwhaley" img="images/linkedin-logo.png" title="LinkedIn" />
                            <CalloutRoundSm url="http://twitter.com/brianwhaley" img="images/twitter-logo.png" title="Twitter" />
                            <CalloutRoundSm url="http://www.pinterest.com/brianwhaley" img="images/pinterest-logo.png" title="Pinterest" />
                        </div>
                        
                        <div class="grid6">
                            <CalloutRoundSm url="https://www.goodreads.com/user/show/49377228-brian-whaley" img="images/goodreads-logo.png" title="Goodreads" />
                            <CalloutRoundSm url="http://www.youtube.com/user/brianwhaley" img="images/youtube-logo.png" title="Youtube" />
                            <CalloutRoundSm url="http://www.google.com/profiles/brian.whaley" img="images/google-plus-logo.png" title="Google Plus" />
                        </div>
                        
                    </div>
                    
                    <div class="row grid8 push2">
                        
                        <div class="grid6">
                            <CalloutRoundSm url="http://pixelatedviews.tumblr.com" img="images/google-reader-logo.png" title="Feed Reader" />
                            <CalloutRoundSm url="http://www.amazon.com/gp/pdp/profile/AMIS1GDCT1RZ?ie=UTF8&amp;ref_=ya_T9_56" img="images/amazon-logo.png" title="Amazon" />
                            <CalloutRoundSm url="https://www.etsy.com/people/bwhaley73" img="images/etsy-logo.png" title="Etsy" />
                        </div>
                        
                        <div class="grid6">
                            <CalloutRoundSm url="https://foursquare.com/brianwhaley" img="images/foursquare-logo.png" title="Foursquare" />
                            <CalloutRoundSm url="http://trees.ancestry.com/tree/7237865" img="images/ancestry-logo.jpg" title="Ancestry" />
                            <CalloutRoundSm url="http://www.facebook.com/brian.t.whaley" img="images/facebook-logo.png" title="Facebook" />
                        </div>

                    </div>
                            
                </div>
                
            </div>



            <div class="page-content-section" id="social-cards-section">
                <div class="content-container">
                    <CalloutHeader title="Social Posts" />
                    <div class="row">	
                        <div id="socialCards" class="column callout grid12">
                            <div class="callout-body">
                                <div class="grid12">
                                    <div class="masonry" id="social">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            </div>



        );
    }
}

export default SocialMedia;