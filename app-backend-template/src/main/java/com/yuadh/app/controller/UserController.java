package com.yuadh.app.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yuadh.app.common.BaseResponse;
import com.yuadh.app.common.ErrorCode;
import com.yuadh.app.common.ResultUtils;
import com.yuadh.app.exception.BusinessException;
import com.yuadh.app.model.domain.User;
import com.yuadh.app.model.request.UserLoginRequest;
import com.yuadh.app.model.request.UserRegisterRequest;
import com.yuadh.app.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

import static com.yuadh.app.constant.UserConstant.ADMIN_ROLE;
import static com.yuadh.app.constant.UserConstant.USER_LOGIN_STATE;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    
    @PostMapping("/register")
    public BaseResponse<Long> userRegister(@RequestBody UserRegisterRequest userRegisterRequest){
        if (userRegisterRequest==null) {
            throw new BusinessException(ErrorCode.PARAM_ERROR);//参数错误
        }
        String userAccount = userRegisterRequest.getUserAccount();
        String userPassword = userRegisterRequest.getUserPassword();
        String checkPassword = userRegisterRequest.getCheckPassword();
        if (StringUtils.isAnyBlank(userAccount,userPassword,checkPassword)) {
            throw new BusinessException(ErrorCode.PARAM_ERROR);//参数错误
        }
        long result = userService.userRegister(userAccount, userPassword, checkPassword); 
        return ResultUtils.success(result);
    }
    @PostMapping("/login")
    public BaseResponse<User> userLogin(@RequestBody UserLoginRequest userLoginRequest, HttpServletRequest request){
        if (userLoginRequest==null) {
            throw new BusinessException(ErrorCode.PARAM_ERROR);//参数错误
        }
        String userAccount = userLoginRequest.getUserAccount();
        String userPassword = userLoginRequest.getUserPassword();
        if (StringUtils.isAnyBlank(userAccount,userPassword)) {
            throw new BusinessException(ErrorCode.PARAM_ERROR);//参数错误
        }
        User user = userService.userLogin(userAccount, userPassword, request);
        return ResultUtils.success(user);
    }
    @PostMapping("/logout")
    public BaseResponse<Integer> userLogin(HttpServletRequest request){
        if (request==null) {
            throw new BusinessException(ErrorCode.PARAM_ERROR);//参数错误
        }
        Integer result = userService.userLogout(request);
        return ResultUtils.success(result);
    }
    @GetMapping("/search")
    public BaseResponse<List<User>> searchUsers(String username, HttpServletRequest request) {
        if (!isAdmin(request)) {
            throw new BusinessException(ErrorCode.PARAM_ERROR);//参数错误
        }
        QueryWrapper<User> qw = new QueryWrapper<>();
        if (StringUtils.isNoneBlank(username)) {
            qw.like("username",username);
        }
        List<User> userList = userService.list(qw);
        List<User> list =  userList.stream().map(user -> {
            return userService.getSafetyUser(user);
        }).collect(Collectors.toList());
        return ResultUtils.success(list);
    }
    @PostMapping("delete")
    public BaseResponse<Boolean> deleteUser(long id,HttpServletRequest request) {
        if (!isAdmin(request)) {
            throw new BusinessException(ErrorCode.NO_AUTH);//参数错误
        }
        if(id<=0){
            throw new BusinessException(ErrorCode.PARAM_ERROR);//参数错误
        }
        boolean b =userService.removeById(id);
        return ResultUtils.success(b);
    }
    @GetMapping("/current")
    public BaseResponse<User> getCurrentUser(HttpServletRequest request){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User currentUser =  (User) userObj;
        if (currentUser == null) {
            throw  new BusinessException(ErrorCode.NOT_LOGIN);
        }
        Long userId = currentUser.getId();
        // 验证用户是否合法
        User user = userService.getById(userId);
        return ResultUtils.success(userService.getSafetyUser(user));
    }
    /**
     * 判断是否为管理员
     * @param request
     * @return
     */
    private boolean isAdmin(HttpServletRequest request){
        Object userObj = request.getSession().getAttribute(USER_LOGIN_STATE);
        User user = (User)userObj;
        return user != null && user.getUserRole() == ADMIN_ROLE;
    }
    
    
}
