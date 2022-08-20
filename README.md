# Jan-Dhan-Darshak

This application acts as a guide for the common people in locating a financial service touch point at a given location in the country.
While locator apps are a common feature for many individual banks and financial service providers, in this era of inter-operable banking services, 
Jan Dhan Darshak app will be in a unique position to provide a citizen centric platform for locating financial service touch points across all 
providers such as banks, post office, CSC, etc.

## Team- TEAM S.P.A.R.K.S.
# Smart India Hackathon 2022
![SIH2022](https://user-images.githubusercontent.com/55245862/156772177-691163b0-a0b0-4102-a945-37b4f281e4c4.jpeg)
## Problem Statement Code: 
> #### RS1079 (Ministry of Finance)
> Upgradation of Jan-Dhan Darshak App

## Features

1. Login/Sign Up.
2. JWT Authentication.
3. OTP Verification.
4. Local language support.
5. Improved UI for better user experience.
6. Voice Interface Phone number of bank branches available in app.
7. Integrated dialing Users’ feedback.
8. In-app GPS Map to trace location.
10. Display route map of the selected place from user location.
11. Rating and feedback systems to ensure better customer experience.
12. Share live location.

## Technology Stack:

<img src="https://img.shields.io/badge/python%20-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white"/> <img src="https://img.shields.io/badge/django%20-%23092E20.svg?&style=for-the-badge&logo=django&logoColor=white"/>  <img src="https://img.shields.io/badge/markdown-%23000000.svg?&style=for-the-badge&logo=markdown&logoColor=white"/><img src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/> <img src="https://img.shields.io/badge/postgres-0B96B2?style=for-the-badge&logo=postgresql&logoColor=white"/> <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/>

- **Frontend**: React Native, Redux
- **Backend**: Django, Django Rest Framework
- **IDE**: VS Code
- **Design**: Figma, Canva
- **API Testing & Documentation**: Postman, Swagger
- **Version Control**: Git and GitHub
- **Database**: PostgreSQL
- **Hosting**: Heroku

### How to Get Started?
### Fork, clone locally & create a branch

Fork [Jan Dhan Darshak Backend](https://github.com/rudrakshi99/Jan-Dhan-Darshak) repository and clone at your local 

- Fork and Clone the repo using
```
$ git clone https://github.com/rudrakshi99/Jan-Dhan-Darshak.git
```
- Change Branch to `backend` using 
```
$ git checkout backend
```
### Setting Environment First Time

#### Basic Requirements 
1. [Python](https://www.python.org/downloads/)
1. [pip](https://pip.pypa.io/en/stable/installation/)

#### Creating [Virtual Environment](https://docs.python.org/3/library/venv.html) 

A virtual environment is a tool that helps keep dependencies required and the project isolated. If you wish to install a new library and write
```
pip install name_of_library
``` 
on the terminal without activating an environment, all the packages will be installed globally which is not a good practice if you’re working with different projects on your computer.

If this sounds a bit complicated, don’t worry so much because a virtual environment is just a directory that will contain all the necessary files for our project to run.

**Installing venv (required once)**

**Windows**
```
py -m pip install --user virtualenv
py -m venv env
```
**Linux**
```
python3 -m pip install --user virtualenv
python3 -m venv env
```

You have to start virtual environment everytime you start new terminal -

**Windows**

Using gitbash
```
. env/Scripts/activate
```
Using Powershell
```
. env\Scripts\activate
```
**Linux**
```
source env/bin/activate
```

#### Installing Requirements 

**Windows**
```
pip install -r requirements/base.txt
pip install -r requirements/local.txt
```
**Linux**
```
pip install -r requirements/base.txt
pip install -r requirements/local.txt
```
#### Setting up Environment File

**Configuring Environment Variables**

Make environment file by copying the example file -
```
cd .envs/.local
cp .django .env
cp .postgres .env
``` 

#### Migrating Database
**Windows**
```
py manage.py migrate
```
**Linux**
```
python3 manage.py migrate
```

#### Create Superuser
**Windows**
```
py manage.py createsupeser
```
**Linux**
```
python3 manage.py createsupeser
```

### Starting Development Server
**Windows**
```
py manage.py runserver
```
**Linux**
```
python3 manage.py runserver
``` 

### Leaving the virtual environment
```
deactivate
```

### Update requirements file (Critical)
If you have installed new dependency, the pip freeze command lists the third-party packages and versions installed in the environment. 

**Windows**
```
pip freeze > requirements/local.txt
```
**Linux**
```
pip3 freeze > requirements/local.txt
```

### Update Database  
Everytime you change db models, you need to run makemigrations and migrate to update on database.

**Windows**
```
py manage.py makemigrations
py manage.py migrate
```
**Linux**
```
python3 manage.py makemigrations
python3 manage.py migrate
``` 

#### GitHub Repository Structure


| S.No. | Branch Name                                                                  | Purpose                       |
| ----- | ---------------------------------------------------------------------------- | ----------------------------- |
| 1.    | [master](https://github.com/rudrakshi99/Jan-Dhan-Darshak/tree/master)                 | contains all Frontend code    |
| 2.    | [backend](https://github.com/rudrakshi99/Jan-Dhan-Darshak/tree/backend)               | contains all Backend code     |



## Team Members:

> "Team Members"

| S.No. | Name | Role | GitHub Username:octocat: |
| --------------- | --------------- | --------------- | --------------- |
| 1. | Rudrakshi (Team Leader) | Backend Development| [@rudrakshi99](https://github.com/rudrakshi99)  |
| 2. | Sarthak Shukla | Frontend Development | [@sarthakshukla1316](https://github.com/sarthakshukla1316) |
| 3. | Suyash Rastogi | Frontend Development | [@suyashrastogi7](https://github.com/suyashrastogi7) |
| 4. | Anmol Srivastava | Backend Development| [@anmolsrivastava1](https://github.com/anmolsrivastava1)  |
| 5. | Parth Sharma | Full-stack Development | [@ParthSharmaT](https://github.com/ParthSharmaT)  |
| 6. | Kushal Gautam | UI Designer | [@kushalgautam](https://github.com/kushalgautam)  |

## Maintainers✨

<table>
  <tbody><tr>
    <td align="center"><a href="https://github.com/rudrakshi99"><img alt="" src="https://avatars.githubusercontent.com/rudrakshi99" width="100px;"><br><sub><b>Rudrakshi</b></sub></a><br><a href="https://github.com/rudrakshi99/Jan-Dhan-Darshak/commits/backend?author=rudrakshi99" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/sarthakshukla1316"><img alt="" src="https://avatars.githubusercontent.com/sarthakshukla1316" width="100px;"><br><sub><b>Sarthak Shukla </b></sub></a><br><a href="https://github.com/rudrakshi99/Jan-Dhan-Darshak/commits?author=sarthakshukla1316" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/anmolsrivastava1"><img alt="" src="https://avatars.githubusercontent.com/anmolsrivastava1" width="100px;"><br><sub><b>Anmol Srivastava </b></sub></a><br><a href="https://github.com/rudrakshi99/Jan-Dhan-Darshak/commits/backend?author=anmolsrivastava1" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ParthSharmaT"><img alt="" src="https://avatars.githubusercontent.com/ParthSharmaT" width="100px;"><br><sub><b>Parth Sharma </b></sub></a><br><a href="https://github.com/rudrakshi99/Jan-Dhan-Darshak/commits/master?author=ParthSharmaT" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kushalgautam"><img alt="" src="https://avatars.githubusercontent.com/kushalgautam" width="100px;"><br><sub><b>Kushal Gautam </b></sub></a><br><a href="https://github.com/rudrakshi99/Jan-Dhan-Darshak" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/suyashrastogi7"><img alt="" src="https://avatars.githubusercontent.com/suyashrastogi7" width="100px;"><br><sub><b>Suyash Rastogi </b></sub></a><br><a href="https://github.com/rudrakshi99/Jan-Dhan-Darshak/commits/master?author=suyashrastogi7" title="Code">💻</a></td>
  </tr>
</tbody></table>

# License :memo:

This project follows the [MIT License](https://choosealicense.com/licenses/mit/).

[![Uses Git](https://forthebadge.com/images/badges/uses-git.svg)](https://github.com/rudrakshi99/Jan-Dhan-Darshak) 
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://github.com/rudrakshi99/Jan-Dhan-Darshak)
[![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://github.com/rudrakshi99/Jan-Dhan-Darshak)
[![Built with love](https://forthebadge.com/images/badges/built-with-love.svg)](https://github.com/rudrakshi99/Jan-Dhan-Darshak.git) [![Built By Developers](https://forthebadge.com/images/badges/built-by-developers.svg)](https://github.com/rudrakshi99/Jan-Dhan-Darshak) 
