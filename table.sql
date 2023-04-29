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

ALTER TABLE vaccine
ADD COLUMN LotNo varchar(20),
ADD CONSTRAINT  fk
FOREIGN KEY (LotNo)
REFERENCES Manufacturing (LotNo);


--  view for user

CREATE VIEW vacView AS
SELECT vaccine.vcode, vaccine.Vname, manufacturing.manufacturer
FROM vaccine
INNER JOIN manufacturing
ON vaccine.lotno = manufacturing.lotno;


UPDATE vaccine
SET lotno = 'MSDC-71002220624' ,availability=15
WHERE Vcode = 90710;

 



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
select v.Vname,v.Vcode, v.LotNo,m.Manufacturer ,m.Manuft_Dt ,m.Exp_Dt from vaccine as v, 
manufacturing as m 
where  v.LotNo=m.LotNo and 
Exp_Dt < curdate();
End //
Delimiter;
Call get_expired();

-- Count no of users
-- count number of vaccine


--view of vacccination and benificiary
SELECT v.Reg_No, b.name, v.Reg_Dt, v.Vacc_Dt, a.Vname, v.Dose_No
FROM vaccination v
JOIN vaccine a ON v.Vcode = a.Vcode
JOIN benificiary b ON v.Benf_ID = b.Benf_ID;



--show vaccines 
select v.Vcode,m.LotNo, v.Vname,m.Manufacturer,v.Availability,m.Manuft_Dt,m.Exp_Dt from 
vaccine as v join manufacturing as m on v.LotNo=m.LotNo;

--vaccination done today
SELECT v.Reg_No, b.name, v.Reg_Dt, v.Vacc_Dt, a.Vname, v.Dose_No
FROM vaccination v
JOIN vaccine a ON v.Vcode = a.Vcode
JOIN benificiary b ON v.Benf_ID = b.Benf_ID where v.Vacc_Dt=curdate() 

--expired vaccines
Create table deleted_vaccine(Vcode int,Vname varchar(50),Manufacturer varchar(100),ManufDt date,ExpDt date,Date_of_Removal date);

-- Trigger to add record of vaccine to deleted_vaccine table before delete from manufacturing

Delimiter //
Create trigger T2
Before delete
On manufacturing for each row
Begin
insert into deleted_vaccine values(
(select vaccine.vcode from vaccine inner join manufacturing on vaccine.vcode=manufacturing.vcode where vaccine.vcode=old.vcode),
(select vaccine.vname from vaccine inner join manufacturing on vaccine.vcode=manufacturing.vcode where vaccine.vcode=old.vcode),
old.manufacturer,old.Manuft_Dt,old.Exp_Dt,current_date);
End //
delimiter ;


-- Procedure to insert into manufacturing and update lotNo , availability in vaccine
 
Delimiter //
Create Procedure insertManuf_updateVaccine(In Lot_No varchar(20),In _Manufacturer varchar(20),In ManufDt date,In ExpDt date,In V_code int,In _Availability int)
Begin
insert into manufacturing values(Lot_No,_Manufacturer,ManufDt,ExpDt);
update vaccine set LotNo = Lot_No, Availability = _Availability where vcode=v_code;
End//
Delimiter ;