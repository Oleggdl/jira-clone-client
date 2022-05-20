import React from 'react'
import './AuthComponent.scss'
import {Button, Form, Input, Radio, Space} from "antd"
import {NavLink} from "react-router-dom"
import Password from "antd/es/input/Password"
import {SettingOutlined} from "@ant-design/icons"


export const AuthComponent = ({
                                  form, loginHandler, isLogIn, setIsLogin, registerHandler, text, buttonSettings,
                                  isSettings, modalSettings, setSetting, currentLanguage, onChangeLanguage
                              }) => {

    return (
        <div className="auth-component-container">
            <h1>Jira-clone</h1>
            {isLogIn ? <div className="auth-container">
                    <div className="container-title">{text("authPage.login.title")}</div>
                    <Form name="auth_login_form"
                          form={form}
                          onFinish={(values) => loginHandler(values)}
                          autoComplete="off">
                        <Form.Item label={`${text("authPage.login.username")}`} name="username"
                                   rules={[{required: true, message: `${text("authPage.login.errors.username")}`}]}>
                            <Input placeholder={`${text("authPage.login.placeholders.username")}`}/>
                        </Form.Item>
                        <Form.Item
                            label={`${text("authPage.login.password")}`}
                            name="password"
                            rules={[{required: true, message: `${text("authPage.login.errors.password")}`}]}>
                            <Password placeholder={`${text("authPage.login.placeholders.password")}`}/>
                        </Form.Item>
                        <Form.Item className="button-container">
                            <Button style={{marginLeft: '43px'}} type="primary" htmlType="submit">
                                {text("authPage.login.loginBtn")}
                            </Button>
                        </Form.Item>
                        <hr/>
                        <p>{text("authPage.login.text")}</p>
                        <Form.Item className="button-container">
                            <Button style={{marginLeft: '43px'}} onClick={() => setIsLogin(false)}>
                                <NavLink to="/">{text("authPage.login.signUp")}</NavLink>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                : <div className="auth-container">
                    <div className="container-title">{text("authPage.signup.title")}</div>
                    <Form name="auth_log_up_form"
                          form={form}
                          onFinish={registerHandler}
                          autoComplete="off">
                        <Form.Item
                            label={`${text("authPage.signup.name")}`} name="name"
                            rules={[{required: true, message: `${text("authPage.signup.errors.name.required")}`},
                                {max: 30, message: `${text("authPage.signup.errors.name.max")}`},
                                {min: 3, message: `${text("authPage.signup.errors.name.min")}`},
                                {
                                    pattern: new RegExp(/[а-яa-zўі]/gi),
                                    message: `${text("authPage.signup.errors.name.pattern")}`
                                }]}>
                            <Input placeholder={`${text("authPage.signup.placeholders.name")}`}/>
                        </Form.Item>
                        <Form.Item
                            label={`${text("authPage.signup.surname")}`} name="surname"
                            rules={[{required: true, message: `${text("authPage.signup.errors.surname.required")}`},
                                {max: 30, message: `${text("authPage.signup.errors.surname.max")}`},
                                {min: 3, message: `${text("authPage.signup.errors.surname.min")}`},
                                {
                                    pattern: new RegExp(/[а-яa-zўі]/gi),
                                    message: `${text("authPage.signup.errors.surname.pattern")}`
                                }]}>
                            <Input placeholder={`${text("authPage.signup.placeholders.surname")}`}/>
                        </Form.Item>
                        <Form.Item
                            label={`${text("authPage.signup.username")}`}
                            name="username"
                            rules={[{required: true, message: `${text("authPage.signup.errors.username.required")}`},
                                {max: 30, message: `${text("authPage.signup.errors.username.max")}`},
                                {min: 3, message: `${text("authPage.signup.errors.username.min")}`},
                                {
                                    pattern: new RegExp(/[a-z]/gi),
                                    message: `${text("authPage.signup.errors.username.pattern")}`
                                }]}>
                            <Input placeholder={`${text("authPage.signup.placeholders.username")}`}/>
                        </Form.Item>
                        <Form.Item
                            label={`${text("authPage.signup.email")}`}
                            name="email"
                            rules={[{required: true, message: `${text("authPage.signup.errors.email.required")}`},
                                {max: 30, message: `${text("authPage.signup.errors.email.max")}`},
                                {min: 3, message: `${text("authPage.signup.errors.email.min")}`},
                                {
                                    pattern: new RegExp(/@/gi),
                                    message: `${text("authPage.signup.errors.email.pattern")}`
                                }]}>
                            <Input placeholder={`${text("authPage.signup.placeholders.email")}`}/>
                        </Form.Item>
                        <Form.Item
                            label={`${text("authPage.signup.password")}`}
                            name="password"
                            rules={[{required: true, message: `${text("authPage.signup.errors.password.required")}`},
                                {max: 30, message: `${text("authPage.signup.errors.password.max")}`},
                                {min: 8, message: `${text("authPage.signup.errors.password.min")}`},
                                {
                                    pattern: new RegExp(/[0-9]/g),
                                    message: `${text("authPage.signup.errors.password.pattern1")}`
                                },
                                {
                                    pattern: new RegExp(/[a-z]/gi),
                                    message: `${text("authPage.signup.errors.password.pattern2")}`
                                }]}>
                            <Password placeholder={`${text("authPage.signup.placeholders.password")}`}/>
                        </Form.Item>
                        <Form.Item
                            label={`${text("authPage.signup.passwordRepeat")}`}
                            name="passwordRepeat"
                            rules={[{required: true, message: `${text("authPage.signup.errors.passwordRepeat.required")}`},
                                {max: 30, message: `${text("authPage.signup.errors.passwordRepeat.max")}`},
                                {min: 8, message: `${text("authPage.signup.errors.passwordRepeat.min")}`},
                                {
                                    pattern: new RegExp(/[0-9]/g),
                                    message: `${text("authPage.signup.errors.passwordRepeat.pattern1")}`
                                },
                                {
                                    pattern: new RegExp(/[a-z]/gi),
                                    message: `${text("authPage.signup.errors.passwordRepeat.pattern2")}`
                                }]}>
                            <Password placeholder={`${text("authPage.signup.placeholders.passwordRepeat")}`}/>
                        </Form.Item>
                        <Form.Item className="button-container">
                            <Button style={{marginLeft: '43px'}} type="primary" htmlType="submit">
                                {text("authPage.signup.signUp")}
                            </Button>
                        </Form.Item>
                        <hr/>
                        <p>{text("authPage.signup.text")}</p>
                        <Form.Item className="button-container">
                            <Button style={{marginLeft: '43px'}} onClick={() => setIsLogin(true)}>
                                <NavLink to="/">{text("authPage.signup.loginBtn")}</NavLink>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>}
            <li className="settings-link" onClick={setSetting} ref={buttonSettings}><SettingOutlined/></li>
            {isSettings && <div className="settings-window" ref={modalSettings}>
                <h3>{text("navbar.languages.current")}: <span>{currentLanguage}</span></h3>
                <Radio.Group onChange={e => onChangeLanguage(e)} name="language" value={currentLanguage}>
                    <Space direction="vertical">
                        <Radio value={'ru'}>{text("navbar.languages.ru")}</Radio>
                        <Radio value={'en'}>{text("navbar.languages.en")}</Radio>
                        <Radio value={'by'}>{text("navbar.languages.by")}</Radio>
                    </Space>
                </Radio.Group>
            </div>}
        </div>
    )
}
