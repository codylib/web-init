package com.yuadh.app.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yuadh.app.model.domain.User;
import org.apache.ibatis.annotations.Mapper;

/**
* @author yuadh
* @description 针对表【user(用户表)】的数据库操作Mapper
* @createDate 2023-01-11 16:27:11
* @Entity generator.domain.User
*/
@Mapper
public interface UserMapper extends BaseMapper<User> {

}




