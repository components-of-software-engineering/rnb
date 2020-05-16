import React, { Component } from 'react';
import Jumbotron from '../../containers/index/Jumbotron';

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <Jumbotron />
                {/* <img className="float-left mr-2 mb-2" id="landing-home" src="/assets/images/common.jpg" alt="warehouse"/> */}
                <p className="mb-1">Також нашим користувачам доступні деякі додаткові функції:</p>
                {/* <div className="d-flex">    
                    <ul id="feature-list">
                        <li>генерація pdf файлів:</li>
                            <ul>
                                <li>товарно-транспортної накладної</li>
                                <li>штрих-коду ТТН</li>
                                </ul>
                        <li>генерація звітів за обраний період:</li>
                            <ul>
                                <li>у форматі xls</li>
                                <li>у форматі csv</li>
                            </ul>
                        <li>сповіщення про доставку/отримання вантажу</li>
                        <li>json API </li>
                    </ul> 
                </div> */}
                <p>
                    Веб-сайт <b>&quot;RNB&quot;</b> – ...
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
            </React.Fragment>
        );
    }
}

export default HomePage;