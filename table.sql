create table userlogin(
    phnum dec(10) primary key,
    password varchar(10) not null,
    role varchar(1) default('U') 
)
create table benificiary(
    benf_id int AUTO_INCREMENT,
    name varchar(50) not null,
    address varchar(100) not null,
    DOB date not null,
    gender char not null,
    phnum dec(10) not null,
    primary key(benf_id),
    foreign key(phnum) references userlogin(phnum)

);