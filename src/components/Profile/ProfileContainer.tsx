import {useDispatch, useSelector} from 'react-redux';
import Profile from "./Profile";
import {getProfile, getStatus, updateProfileInfo, updateProfilePhoto, updateStatus} from "../../redux/profile-reducer";
import {ProfileType} from "../../APItypes/APItypes";
import {withRouter} from "../../hoc/WithRouter";
import {useEffect} from "react";
import {AppStateType} from "../../redux/redux-store";

const ProfileContainer = (props: PropsType) => {
    const profile = useSelector((state: AppStateType) => state.profilePage.profile);
    const status = useSelector((state: AppStateType) => state.profilePage.status);
    const authUserId = useSelector((state: AppStateType) => state.auth.userId);
    const dispatch = useDispatch();

    const { router } = props;
    const update = async (profile: ProfileType) => {
        try {
            await dispatch(updateProfileInfo(profile));
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    useEffect(() => {
        updateProfile();
    }, [authUserId, router.params.userId]);

    const updateProfile = () => {
        const userIdFromParams = router.params.userId;

        if (userIdFromParams) {
            dispatch(getProfile(userIdFromParams));
            dispatch(getStatus(userIdFromParams));
            return;
        }

        if (authUserId) {
            router.navigate(`/profile/${authUserId}`);
            return;
        }

        router.navigate('/login');
    };

    const isOwner = Number(router.params.userId) === Number(authUserId);
    return (
        <Profile
            {...props}
            profile={profile}
            status={status}
            updateStatus={(status: string) => dispatch(updateStatus(status))}
            updateProfilePhoto={(file: File) => dispatch(updateProfilePhoto(file))}
            isOwner={isOwner}
            updateProfileInfo={update}
        />
    );
}

export default withRouter(ProfileContainer);

type PropsType = {
    profile: ProfileType | null
    status: string
    authUserId: number | null
    isOwner: boolean,
    router: RouterType
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    updateProfilePhoto: (file: File) => void
    updateProfileInfo: (profile: ProfileType) => Promise<void>
}

type RouterType = {
    params: {
        userId: number;
    };
    navigate: (path: string) => void;
};