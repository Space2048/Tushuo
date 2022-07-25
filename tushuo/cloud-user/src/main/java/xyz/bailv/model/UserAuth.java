package xyz.bailv.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 用户认证类
 * @author Bailibo
 * @time 22/1/19
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAuth{
    /**
     *用户认证表id
     */
    Long userAuthId;

    /**
     * 用户id
     */
    String userId;

    /**
     * 认证方式 0:账号密码 1:邮箱密码 3,微信 4:手机号
     */
    int identityType;

    /**
     * 认证账号
     */
    String identifier;

    /**
     * 认证码
     */
    String credential;

    /**
     * uuid
     */
    String uuid;

    /**
     * 验证码
     */
    String verCode;
}
