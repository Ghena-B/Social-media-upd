import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

const Login = (props) => {
    const navigate = useNavigate();
    if (props.isAuth) {
        return navigate('/profile');
    }
    return (<div>
        <h1>Login</h1>
        <LoginForm login={props.login} errorMessage={props.errorMessage}/>
    </div>)
};
export default Login;

const LoginForm = (props) => {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = data => props.login(data.email, data.password, data.rememberMe);

    return (
        <form onSubmit={handleSubmit(onSubmit)} action="" name='login-form'>
            <div>
                <input {...register('email', {
                    required: true,
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email format',
                    }})} type="email" placeholder="Login" name="email" />
                {errors.email && (
                    <span>{errors.email.message}</span>
                )}
            </div>
            <div>
                <input {...register('password', {
                    required: true,
                    minLength: {
                        value: 6,
                        message: 'Password must have at least 6 characters',
                    }})} type="password" placeholder="Password" name="password" />
                {errors.password && (
                    <span>{errors.password.message}</span>
                )}
            </div>
            <div>{props.errorMessage && <p>{props.errorMessage}</p>}</div>
            <div>
                <input {...register('rememberMe')} type="checkbox"/>
                <label>Remember Me</label>
            </div>
            <button type="submit">Login</button>
        </form>
    )
}
/*
<div>
    <input {...register('email', {
        required: true,
        pattern: {
            value: /^\S+@\S+$/i,
            message: 'Invalid email format',
        }})} type="email" placeholder="Login" name="email"/>
    {errors.email && <span>{errors.email.message}</span>}
</div>
<div>
    <input {...register('password', {
        required: true,
        minLength: {
            value: 6,
            message: 'Password must have at least 6 characters',
        }})} type="password" placeholder="Password" name="password"/>
    {errors.password && <span>{errors.password.message}</span>}
</div>
<div>
    <input {...register('rememberMe')} type="checkbox"/>
    <label>Remember Me</label>
</div>
<button type="submit">Login</button>*/