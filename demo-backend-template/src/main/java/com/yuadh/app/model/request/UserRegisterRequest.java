package com.yuadh.app.model.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserRegisterRequest  implements Serializable {
    private static final long serialVersionUID = -7541016035124568660L;
    private String userAccount;
    private String userPassword;
    private String checkPassword;
}
