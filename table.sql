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


-- Procedure to insert into manufacturing and update lotNo , availability in vaccine
 
Delimiter //
Create Procedure insertManuf_updateVaccine(In Lot_No varchar(20),In _Manufacturer varchar(200),In ManufDt date,In ExpDt date,In V_code int,In _Availability int)
Begin
insert into manufacturing values(Lot_No,_Manufacturer,ManufDt,ExpDt);
update vaccine set LotNo = Lot_No, Availability = _Availability where vcode=v_code;
End//
Delimiter ;
call insertManuf_updateVaccine(?,?,?,?,?,?)

--benif
select * from benificiary where phnum=?

--user
--signup
select phnum,password from userlogin where phnum=?
insert into userlogin(phnum,password) values(?,?)

--login
select phnum,password,role from userlogin where phnum=?

-- to check roles
select phnum,role from userlogin where role='u'

-- add vaccination bookings
select * from vaccination where  benf_id=? and reg_dt=?
insert into vaccination(benf_id,vcode,reg_dt,dose_no,vacc_dt) values(?,?,?,?,?)

--vaccination 
select * from vaccination where benf_id=? and Vcode=? and Dose_No=?

-- display 0 vaccine data
SELECT vaccine.Vcode, vaccine.Vname, vaccine.LotNo, manufacturing.Manufacturer
    FROM vaccine
    INNER JOIN manufacturing ON vaccine.LotNo = manufacturing.LotNo
    WHERE vaccine.availability = 0;


-- vaccines to add after expiry

-- EB-62506211223  | Emergent BioSolutions         | 2021-06-02 | 2023-12-02  90625 | Vaxchora 
--SII-61903230925  | Serum Institute of India      | 2021-03-08 | 2025-09-14    90619 | MenACWY

 --Hepatitis A | 90633 | SII-63302230525  | Serum Institute of India | 2023-02-10 | 2023-05-25 |
|-- Hepatitis B | 90747| SII-74701231224 | Serum Institute of India | 2023-01-10 | 2023-08-01

--unavailable vaccine

-- 90715 | Tdap  | DVBL-71504230825 | Dano vaccines & Biologicals Pvt Ltd|
--before DVBL-71504230825

-- ***additional entries to add to maufacturing
-- INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
-- VALUES (
--     'SII-61901210923',
--     'Serum Institute of India',
--     '2021-01-18',
--     '2023-09-08'
--   );

--   INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
-- VALUES (
--     'Nov-70012201122',
--     'Novavax',
--     '2020-12-18',
--     '2022-11-02'
--   );

--   INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
-- VALUES (
--     'BB-68812211123',
--     'Bharat Biotech',
--     '2021-12-18',
--     '2023-11-02'
--   );

--     INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
-- VALUES (
--     'BH-64812220323',
--     'BioHib',
--     '2022-12-18',
--     '2023-03-11'
--   );

--     INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
-- VALUES (
--     'CP-70712210522',
--     'Cadila Pharmaceuticals',
--     '2021-12-01',
--     '2022-05-02'
--   );

--     INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
-- VALUES (
--     'EB-62506210423',
--     'Emergent BioSolutions',
--     '2021-06-11',
--     '2023-04-02'
--   );

--     INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
-- VALUES (
--     'Nov-70001230423',
--     'Novavax',
--     '2023-08-01',
--     '2023-04-29'
--   );

--    INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
-- VALUES (
--     'CP-70708220123',
--     'Cadila Pharmaceuticals',
--     '2022-08-13',
--     '2023-01-30'
--   );

--     INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
-- VALUES (
--     'BH-64808201221',
--     'BioHib',
--     '2020-08-07',
--     '2021-12-19'
--   );

  INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
VALUES (
    'SII-61911220523',
    'Serum Institute of India',
    '2022-11-19',
    '2023-05-02'
  );


    INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
VALUES (
    'EB-62510200921',
    'Emergent BioSolutions',
    '2020-10-24',
    '2021-09-20'
  );

--       INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
-- VALUES (
--     'MSDC-71012220523',
--     'Merk Sharp & Dohme Corp',
--     '2022-12-19',
--     '2023-05-04'
--   );

--     INSERT INTO manufacturing (LotNo, Manufacturer, Manuft_Dt, Exp_Dt)
-- VALUES (
--     'MSDC-71012210522',
--     'Merk Sharp & Dohme Corp',
--     '2021-12-23',
--     '2022-05-18'
--   );