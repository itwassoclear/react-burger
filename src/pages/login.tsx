import { useDispatch, useSelector } from "../services/types/index";
import { Link, Redirect, useLocation } from "react-router-dom";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { login, SET_AUTH } from "../services/actions/login";
import styles from "./pages.module.css";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation<{ from: string }>();
  const form = useSelector((store) => store.login.form);
  const isUser = useSelector((store) => store.user.isUser);

  function fillField(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: SET_AUTH,
      payload: { ...form, [e.target.name]: e.target.value },
    });
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(login(form));
  }

  if (isUser) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  return (
    <div className={styles.wrapper}>
      <form onSubmit={(e) => submitForm(e)}>
        <h1 className='text text_type_main-medium mb-6'>Вход</h1>
        <div className='mb-6'>
          <Input
            type='email'
            placeholder='E-mail'
            name='email'
            onChange={(e) => fillField(e)}
            value={form.email}
          />
        </div>
        <div className='mb-6'>
          <Input
            type='password'
            placeholder='Пароль'
            name='password'
            onChange={(e) => fillField(e)}
            value={form.password}
          />
        </div>
        <div className='mb-20'>
          <Button type='primary' size='medium'>
            Войти
          </Button>
        </div>
        <p className='text text_type_main-default text_color_inactive mb-4'>
          Вы — новый пользователь?{" "}
          <Link to='/register' className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          Забыли пароль?{" "}
          <Link to='/forgot-password' className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </div>
  );
};
