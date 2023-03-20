import React from 'react';
import {ProfileAvatar} from "../c1-profile-avatar/ProfileAvatar";
import avatar from '../../../../../images/img-profile/avatar-profile.png'

export const ProfileInfoContainer = () => {
    return (
        <div>
            {/*<ProfileName name={}/>*/}
            <ProfileAvatar imgName={avatar}/>
        </div>
    );
};
