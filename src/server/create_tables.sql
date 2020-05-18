
CREATE TABLE IF NOT EXISTS notarius
(
    id                     serial NOT NULL,  -- унікальний ідентифікатор
    type                   boolean NOT NULL, -- тип(приватний/державний)
    status                 text NOT NULL,    -- статус
    date_status_update     date NOT NULL,    -- дата набуття статусу
    num_certificate        text,             -- номер свідоцтва
    num_card               bigint,           -- номер посвідчення
    name                   text,             -- ПІБ нотаріуса
    name_organization      text,             -- назва нотаріальної контори
    region                 text NOT NULL,    -- регіон
    contacts               text NOT NULL,    -- контактні дані
    notarius_region        text NOT NULL,    -- нотаріальний округ
    additional_info        text,             -- додаткові відомості
    date_issue_certificate date,             -- дата видачі свідоцтва
    date_issue_card        date,             -- дата видачі посвідчення
    date_reg_region        date,             -- дата реєстрації нотаріального округу
    location               text NOT NULL,    -- місцезнаходження
    CONSTRAINT notarius_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS blank
(
    num            int NOT NULL,         -- номер
    series         varchar(2) NOT NULL,  -- серія
    notarius_id    bigint NOT NULL,      -- id нотаріуса, що отримав бланки
    date_receiving date NOT NULL,        -- дата отримання
    CONSTRAINT blank_pkey PRIMARY KEY (num, series),
    CONSTRAINT foreign_key_to_notarius FOREIGN KEY (notarius_id )
        REFERENCES notarius (id) MATCH FULL
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS code_usages_blank
(
    code                int NOT NULL,    -- код
    text_representation text NOT NULL,   -- текстове пояснення
    CONSTRAINT code_usages_blank_pkey PRIMARY KEY (code)
);

CREATE TABLE IF NOT EXISTS users
(
    id                serial NOT NULL,  -- унікальний ідентифікатор користувача
    name              text NOT NULL,    -- ПІБ користувача
    role              int NOT NULL,     -- роль(Адміністратор/реєстратор)
    date_registration date NOT NULL,    -- дата реєстрації
    username          text NOT NULL,    -- логін користувача
    pwd_hash          text NOT NULL,    -- хеш паролю
    pwd_salt          text NOT NULL,    -- "сіль" паролю
    date_last_update  date NOT NULL,    -- остання дата оновлення ідентифіка
    status            boolean NOT NULL, -- статус(дійсний/вимкнений)
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT unq_username UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS usages_register
(
    id              serial NOT NULL, -- унікальний ідентифікатор витрачання
    num_blank       int NOT NULL,    -- номер бланку
    series_blank    text NOT NULL,   -- серія бланку
    date_usage      date NOT NULL,   -- дата витрачання
    code_usage      int NOT NULL,    -- код витрачання
    additional_info text,            -- додаткові відомості
    CONSTRAINT usages_register_pkey PRIMARY KEY (id),
    CONSTRAINT blank_ukeys_u UNIQUE(num_blank, series_blank),
    CONSTRAINT foreign_key_to_code_usage FOREIGN KEY (code_usage)
        REFERENCES code_usages_blank (code) MATCH FULL
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS verifications_register
(
    id                serial NOT NULL, -- id перевірки
    num_blank         int NOT NULL,    -- номер бланку, що перевіряється
    series_blank      text NOT NULL,   -- серія бланку, що перевіряється
    user_id           bigint NOT NULL, -- id користувача, що перевірив
    date_verification date NOT NULL,   -- дата перевірки
    CONSTRAINT verifications_register_pkey PRIMARY KEY (id),
    CONSTRAINT blank_ukeys_v UNIQUE(num_blank, series_blank)
);

CREATE TABLE IF NOT EXISTS journal_actions
(
    id           serial NOT NULL, -- id події
    user_id      bigint NOT NULL, -- id користувача
    action_date  date NOT NULL,   -- дата події
    action_type  int NOT NULL,    -- тип події
    row_affected text NOT NULL,   -- строка таблиці де подія відбулася
    old_value    text NOT NULL,   -- старе значення
    new_value    text NOT NULL,   -- нове значення
    CONSTRAINT journal_actions_pkey PRIMARY KEY (id),
    CONSTRAINT foreign_key_to_user_id FOREIGN KEY (user_id)
        REFERENCES users (id) MATCH FULL
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
);