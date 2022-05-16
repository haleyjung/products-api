<div id="top"></div>

# System Design Capstone: /products

Working in a team of three engineers, we inherited a legacy codebase of an existing e-commerbe web application to build 3 micro services that will withstand the web scale traffic loads. Each member took ownership of one unique API service that will maintain the existing application data set. I was responsible for redesigning and building a backend server and database for the products API service.

## Tech Stack

![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-0064a5?logo=postgresql&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/-Express-DCDCDC?logo=express&logoColor=black&style=for-the-badge)
![Node](https://img.shields.io/badge/-Node-9ACD32?logo=node.js&logoColor=white&style=for-the-badge)
![NGINX](https://img.shields.io/badge/-NGINX-009900?logo=nginx&logoColor=white&style=for-the-badge)
![AWS](https://img.shields.io/badge/-AWS-232F3E?logo=amazonaws&logoColor=white&style=for-the-badge)
![Jest](https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white&style=for-the-badge)
![AutoCannon](https://img.shields.io/badge/-AutoCannon-696969?logo=autocannon&logoColor=white&style=for-the-badge)
![loader.io](https://img.shields.io/badge/-loader.io-6495ED?logo=loader.io&logoColor=white&style=for-the-badge)

## API Development & Optimization

![products_RDBMS_schema](https://user-images.githubusercontent.com/73789849/168510611-08500d28-2e0f-49c5-8a4a-a936bbd32c07.png)

- Design and evaluate **RDBMS** and **DBMS** and consider tradeoffs: selected **PostgreSQL**

- Performe an **ETL Process** to transfer the full application data set (55M) into PostgreSQL database

- Optimize queries using **B-tree indexes** and reduce latency by building **aggregate tables**

## Deployment

- Set up **NGINX load balancer** with ip_hash method for horizontal scaling and reduce latency by 800%
- Scale microservice to handle 3000 RPS by deploying 3 Node/Express servers and database on **AWS EC2**

## Load & Stress Testing

- Used **AutoCannon** to simulate load on the server in development environment
- Conducted cloud-based performance and stress testing with **loader.io** 
- Achieved 3000 RPS with latency 10ms with 0% error rate 

| Endpoints  | /products/product_id  | /products/product_id/styles | /products/product_id/related |
| ------------- | ------------- | ------------- | ------------- |
| **Avg res time**  | 4ms  | 5ms  | 4ms  |
| **Min/Max**  | 3/125ms  | 3/88ms  | 3/67ms  |
| **Err rate**  | 0%  | 0%   | 0%  |

## Getting Started

### Prerequisites
- npm
```
npm install npm@latest -g
```

### Installation 

1. Clone the repo
   ```sh
   git clone https://github.com/sdc-cinnamon/sdc-products.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Set up `.env` file in the server's root directory and add the following info
   ```js 
    PORT="paste_port_number"
    PG_PORT="paste_pg_port_number"
    PG_USER="paste_username"
    PG_PASSWORD="paste_password"
    PG_HOST='paste_IP_address'
    PG_DBNAME="page_pg_database_name"
   ```

<p align="right">(<a href="#top">back to top</a>)</p>
