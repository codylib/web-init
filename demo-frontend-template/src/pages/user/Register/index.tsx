import Footer from '@/components/Footer';
import { register } from '@/services/ant-design-pro/api';
// import { login } from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import {  message, Tabs } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import styles from './index.less';

const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: API.RegisterParams) => {
    const {userPassword,checkPassword} = values;
    if(userPassword!==checkPassword){
      message.error('两次密码不一致');
      return;
    }
    try{
      const id = await register(values);
      if(id){
        message.success('注册成功')
        if(!history){
          return 
        }
        const {query} = history.location;
        history.push('/user/login',query);
        return 
      }
    }catch(err){
      console.log(err)
      message.error('注册失败请重试')
    }

  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="前端初始模板"
          subTitle={'能在此项目基础上快速开始你的应用'}
          initialValues={{
            autoLogin: true,
          }}
          submitter={{
            searchConfig:{
              submitText:'注册'
            }
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号注册'} />
          </Tabs>

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min:8,
                    type:'string',
                    message:'密码长度不能小于8'
                  }
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请确认密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min:8,
                    type:'string',
                    message:'密码长度不能小于8'
                  }
                ]}
              />
            </>
          )}

          
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
