/**
 * 智能导入输入示例
 */
export const AUTO_INPUT_EXAMPLE = "id，用户名，创建时间，更新时间，is_deleted";

/**
 * JSON 输入示例
 */
export const JSON_INPUT_EXAMPLE = {
    dbName: 'yupi_db',
    tableName: 'user',
    tableComment: '用户表',
    fieldList: [
        {
            fieldName: 'username',
            comment: '用户名',
            fieldType: 'varchar(256)',
            mockType: '随机',
            mockParams: '人名',
            notNull: true,
            primaryKey: false,
            autoIncrement: false,
        },
        {
            fieldName: 'id',
            comment: '主键',
            fieldType: 'bigint',
            mockType: '固定',
            notNull: true,
            primaryKey: true,
            autoIncrement: true,
        },
        {
            fieldName: 'create_time',
            comment: '创建时间',
            defaultValue: 'CURRENT_TIMESTAMP',
            fieldType: 'datetime',
            mockType: '固定',
            notNull: true,
            primaryKey: false,
            autoIncrement: false,
        },
        {
            fieldName: 'update_time',
            comment: '更新时间',
            defaultValue: 'CURRENT_TIMESTAMP',
            fieldType: 'datetime',
            mockType: '固定',
            notNull: true,
            primaryKey: false,
            autoIncrement: false,
            extra: 'on update CURRENT_TIMESTAMP',
        },
        {
            fieldName: 'is_deleted',
            comment: '是否删除(0-未删, 1-已删)',
            defaultValue: '0',
            fieldType: 'tinyint',
            mockType: '固定',
            notNull: true,
            primaryKey: false,
            autoIncrement: false,
        },
    ],
};

/**
 * SQL 输入示例
 */
export const SQL_INPUT_EXAMPLE =
    '-- 用户表\n' +
    'create table if not exists yupi_db.user\n' +
    '(\n' +
    "id bigint not null auto_increment comment '主键' primary key,\n" +
    "username varchar(256) not null comment '用户名',\n" +
    "create_time datetime default CURRENT_TIMESTAMP not null comment '创建时间',\n" +
    "update_time datetime default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间',\n" +
    "is_deleted tinyint default 0 not null comment '是否删除(0-未删, 1-已删)'\n" +
    ") comment '用户表';";
