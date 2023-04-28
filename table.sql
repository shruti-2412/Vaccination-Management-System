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



--  view for user

CREATE VIEW vacView AS
SELECT vaccine.vcode, vaccine.Vname, manufacturing.manufacturer
FROM vaccine
INNER JOIN manufacturing
ON vaccine.vcode = manufacturing.vcode;






--  procedure to calculate age and show vaccine according to age group.
delimiter //

create procedure getVac(IN id int)
begin 
    declare age decimal(4,2);
    select CONCAT(
            FLOOR(DATEDIFF(CURDATE(), dob) / 365), '.',
            ROUND((DATEDIFF(CURDATE(), dob) % 365), 1)
        ) into age
    from benificiary where benf_id=id;
    select age;
    select Vcode,Vname from vaccine where age >= from_age and age <= to_age; 
end //

delimiter ;
--output format => [ [{"age:"}],[{"Vname:"},{}....] ] so for Vname,'data[1].Vname'..


--for decreasing availability by 1
 Delimiter //
Create trigger T6
After Insert
On vaccination for each row
Begin
update vaccine set Availability = (Availability-1) where Vcode=new.Vcode;
End //



Create table Expired_vaccine(Vcode int primary key, Vname varchar(20) not null, No_of_Doses int not null, From_age int not null, To_age int null, Price int not null, Dt_of_Removal date not null);

Delimiter //
Create trigger T1
Before Delete
On vaccine for each row 
insert into Expired_vaccine
values(old.Vcode,old.Vname,old.No_of_Doses,old.From_age,old.To_age,old.Price,current_date);

--get expired
Delimiter //
Create Procedure get_expired()
Begin
select * from manufacturing where Exp_Dt < curdate();
End //
Delimiter;
Call get_expired();

-- Count no of users
-- count number of vaccine
-- search a vaccine
