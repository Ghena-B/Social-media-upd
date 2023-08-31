import {Spin} from "antd";
import './Preloader.css';

let Preloader = () => {
    return (
        <div className="preloader-container">
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        </div>
    )
};
export default Preloader;
