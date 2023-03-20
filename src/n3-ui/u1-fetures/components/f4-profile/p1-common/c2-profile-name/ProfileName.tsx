import React from 'react';

export type ProfileNamePropsType = {
    name: string
}

export const ProfileName: React.FC<ProfileNamePropsType> = (props) => {
    return (
        <div>
            <input type="text"/>
            {props.name}
        </div>
    );
};
