import React from 'react';
import {SuperInputText} from "./s1-SuperInputText/SuperInputText";
import {SuperButton} from "./s2-SuperButton/SuperButton";
import {SuperCheckbox} from "./s3-SuperCheckbox/SuperCheckbox";

export const AllSuperComponents = () => {
    return (
        <div>
            <SuperInputText/>
            <SuperCheckbox/>
            <SuperButton/>
        </div>
    );
};

