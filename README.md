# Vaccination-Management-DBMS-
## Category: Website

## Purpose:
The main purpose of this project is to make the vaccination task easy for users and providers and develop a website that replaces the traditional way of registration for vaccination.

## Introduction:
   The vaccination management system aims to create a website that helps users register for a particular vaccine from the database. The user-friendly interface will help the user to complete the registration with ease.

## Project Description:
The website will have a login page in which the user must log in with his /her phone number and password. Once logged in the user will have to add the patient's details, which will lead to the successful registration of the beneficiary. Then there will be an option for taking vaccination where the user will get the vaccine names that are applicable to the beneficiary based on his age from which they can select desired vaccination. Once done, this will add information for vaccination in the database and a page will be displayed which will contain all the information about the vaccination and also the registration id which will be unique for all the vaccination. Many users can register for many vaccinations. One user can register for more than one beneficiary.   

## Database Requirements :
   We will have 3 entities and one relation between all the entities. The 3 entities include beneficiary, login and vaccine. The relation between them will be vaccination.
The login entity will have attributes such as Phno as a primary key, a password for account protection and a role that will be either user or admin. 
The beneficiary entity will have attributes describing the beneficiary such as name, address, dob, gender, aadharno and a unique beneficiary id as a primary key.
The vaccine entity has attributes describing the vaccine such as vaccine code, vaccine name, no of doses, manufacturer, applicable age for a vaccine, manufacturing date, expiry date, price, lot no, and available doses.
The vaccination relationship will have attributes that will describe the vaccination process such as registration no, registration date, vaccination date, and dose no of the vaccine.

There is a many-to-many relationship between all the entities and the relationship set.


## Software tools :

## Front End: HTML, CSS, Javascript

## Back End: MySQL 8.0.32

## Database Connectivity: Express.js


## ERD Diagram (Entity - Relationship diagram):-

   
![image](https://github.com/isha-73/Vaccination-Management-DBMS-/assets/87441080/5e5dbb63-5382-4161-b93c-2e7cd0db4d7b)


## Normalization : 

In order to accurately represent the data and the relationship that exists in the data we have to perform normalization on the tables. The tables are created from ERD by applying normalization.

1NF: Here all the rows and columns of tables namely, Beneficiary, Vaccine, Login, and Vaccination have an atomic value and thus all these tables are already in 1NF.
2NF: All the tables present in ERD are already in 2NF as all of them have a  single attribute primary key.

## Functional Dependencies : 

Vcode     —>  VName , DoseNo , Manufacturer , From_age , To_age , Exp_Dt ,    
                       Price, Availability, Manuf_Dt, LotNo
Benf_ID  —>  Name , Addr , DOB , Gender , AdharNo 
PhNo       —>  Role, Password
RegNo     —>  RegDt , Vacc_Dt , DoseNo

3NF: The Beneficiary table, Vaccination table, and Login table are in 3NF as these tables are in 2NF, besides this, the transitive dependencies are not present in these tables.
The vaccine table is in 2NF but contains transitive relationships as follows and to normalize the table to 3NF we decompose it into 2 tables viz Vaccine and Manufacturing.

![image](https://github.com/isha-73/Vaccination-Management-DBMS-/assets/87441080/0d5c4764-a744-4802-9fed-a360d565c6c5)




