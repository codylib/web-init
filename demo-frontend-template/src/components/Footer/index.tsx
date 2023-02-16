import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'yuadh_快速开始网站模板';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'yuadh_blog',
          title: '个人博客',
          href: 'https://www.yuadh.com',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined/>,
          href: 'https://github.com/yuadh',
          blankTarget: true,
        },
        {
          key: 'yuadh_bilibili',
          title: '个人B站',
          href: 'https://space.bilibili.com/27125162',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
