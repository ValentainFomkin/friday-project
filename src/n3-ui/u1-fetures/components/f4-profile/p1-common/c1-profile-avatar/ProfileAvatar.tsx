import React from 'react';

export type ProfileAvatarPropsType = {
    imgName: any
}

export const ProfileAvatar: React.FC<ProfileAvatarPropsType> = (props) => {
    return (
        <img src={props.imgName} alt="some avatar"/>
    );
};

