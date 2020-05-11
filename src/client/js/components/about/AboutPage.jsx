import React, { Component } from 'react';

class AboutPage extends Component {
    render() {
        return (
            <React.Fragment>
                <h1>Тут опис </h1>
                <p>
                    <b>RNB</b> - це ...
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis varius 
                    vehicula eros, in elementum velit sagittis id. Cras convallis tempus 
                    rutrum. Suspendisse potenti. In hac habitasse platea dictumst. Pellentesque 
                    in imperdiet turpis. Cras convallis velit ac risus dignissim, sed interdum 
                    leo vestibulum. Praesent vitae varius dui. Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit. Donec porta massa at tellus interdum, non 
                    dictum nulla posuere. Cras varius velit tellus, ac blandit mi malesuada et. 
                </p>
                <div className="location mb-4">
                    <div className="row p-3">    
                        <div className="col">
                            <strong>Адреса:</strong> Україна, м.Київ, пл. Майдан Незалежності, 1 
                            <br/>
                            <strong>Телефон:</strong> 0-800-500-609 
                        </div>
                        <div className="col-6 d-none d-xl-block d-lg-block">
                            <img className="map img-fluid w-100" src="/assets/images/map.png" alt="map"/> 
                        </div>
                    </div>
                    <div className="d-lg-none d-xl-none">
                        <img className="map px-4 pb-2 w-100" src="/assets/images/map.png" alt="map"/> 
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AboutPage;