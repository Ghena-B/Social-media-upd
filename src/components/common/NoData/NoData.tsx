import React from "react";
import {Empty} from "antd";
import {SmileOutlined} from "@ant-design/icons";

const NoData: React.FC = () => {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "70vh"}}>
            <Empty
                image={<SmileOutlined style={{fontSize: 22}}/>}
                imageStyle={{height: 20}}
                description={
                    <span>To be developed</span>
                }>
            </Empty>
        </div>
    )
};
export default NoData;