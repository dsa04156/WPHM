import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { authActions } from "../../redux/reducer/authReducer";
import jwtDecode from "jwt-decode";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(authActions.logIn());
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="middle">
      <div className="login_back">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="login">로그인</div>
          <Form.Group>
            <Form.Label htmlFor="email">이메일</Form.Label>
            <Form.Control
              id="email"
              type="text"
              placeholder="test@email.com"
              aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
              {...register("email", {
                required: "이메일은 필수 입력입니다.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            {errors.email && <small role="alert">{errors.email.message}</small>}
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="password">비밀번호</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="****************"
              aria-invalid={!isDirty ? undefined : errors.password ? "true" : "false"}
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 8,
                  message: "8자리 이상 비밀번호를 사용하세요.",
                },
              })}
            />
            {errors.password && <small role="alert">{errors.password.message}</small>}
          </Form.Group>
          <Button type="submit" disabled={isSubmitting} className="button">
            로그인
          </Button>
          <Link to="/signup">
            <Button className="button">회원가입</Button>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
