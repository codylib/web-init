package com.yuadh.app.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yuadh.app.model.domain.User;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
* @author yuadh
* @description 针对表【user(用户表)】的数据库操作Service
* @createDate 2023-01-11 16:27:11
*/
public interface UserService extends IService<User> {
    
    /**
     * 用户注册
     * @param userAccount
     * @param userPassword
     * @param checkPassword
     * @return
     */
    Long userRegister(String userAccount,String userPassword,String checkPassword);

    /**
     * 用户登录
     * @param userAccount
     * @param userPassword
     * @return 
     */
    User userLogin(String userAccount, String userPassword, HttpServletRequest request);

    /**
     * 用户注销
     * @param request
     * @return
     */
    int userLogout(HttpServletRequest request);
    /**
     * 用户数据脱敏
     * @param originUser
     * @return
     */
    User getSafetyUser(User originUser);

    /**
     * 通过标签列表，搜索用户
     * @param tagNameList
     * @return
     */
    List<User> searchUserByTags(List<String> tagNameList);
}
