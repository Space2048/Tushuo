package xyz.bailv.model;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

/**
 * 用户对象(代码重构)
 * @author Bailibo
 * @time 22-7
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@TableName("users")
public class User{
    /**
     * 用户id
     */
    @TableId("id")
    private String userId;

    /**
     * 用户昵称
     */
    @TableField("nick_name")
    private String nickName;

    /**
     * 用户头像地址
     */
    private String avatar;

    /**
     *用户所在学院
     */
    private String college;

    /**
     * 用户所在专业
     */
    private String major;

    /**
     * 账号状态
     */
    private Integer usable;

    /**
     * 账号创建时间
     */
    private Date addTime;
    /**
     * 用户登录时间
     */
    private Date loginTime;

    /**
     * 用户登录ip
     */
    private  String loginIp;

    /**
     * 用户个性签名
     */
    private String content;

}