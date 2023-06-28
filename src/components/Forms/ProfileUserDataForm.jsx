import {useForm} from "react-hook-form";

const ProfileUserDataForm = ({profile, editModeOff, updateProfileInfo}) => {
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: profile,});

    const onSubmit = data => {
        updateProfileInfo(data);
        editModeOff();
        console.log(data)
    }
    return <form onSubmit={handleSubmit(onSubmit)} action="" name='profile-form'>
        <div>
            <input {...register('fullName', {
                required: true,
            })} type="text" placeholder="Edit your name" name="fullName" />
            {errors.fullName && (
                <span>{errors.fullName.message}</span>
            )}
        </div>
        <div>
            <textarea {...register('aboutMe')} placeholder="Add information here" name="aboutMe" />
            {errors.aboutMe && (
                <span>{errors.aboutMe.message}</span>
            )}
        </div>
        <div>
            <input {...register('lookingForAJob')} type="checkbox" name="lookingForAJob"/>
            <label>Looking for a job</label>
        </div>
        <div>
            <textarea {...register('lookingForAJobDescription')}
                   placeholder="Enter your preferences"
                   name="lookingForAJobDescription" />
            {errors.lookingForAJobDescription && (
                <span>{errors.lookingForAJobDescription.message}</span>
            )}
        </div>
        {Object.entries(profile.contacts).map(([name, url]) => (
            <div key={name}>
                <input
                    {...register(`contacts.${name}`, {
                        pattern: {
                            value: /^(https?:\/\/)?[a-z0-9]+([-.][a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
                            message: 'Invalid website name',
                        }
                    })}
                    type="text"
                    placeholder={name}
                    name={`contacts.${name}`}
                />
                {errors.contacts && errors.contacts[name] && (
                    <span>{errors.contacts[name].message}</span>
                )}
            </div>
        ))}
        <button type="submit" >Save changes</button>
    </form>
};
export default ProfileUserDataForm;