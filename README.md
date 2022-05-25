<div id="top"></div>

# System Design: Products API

The goal of the project was to build a scalable RESTful API for an existing e-commerce web application and optimize it to withstand the web scale traffic loads. Working in a team of three engineers, we inherited a legacy codebase and each member took ownership of a micro service that will maintain the existing application data set. I was responsible for redesigning and building a backend server and database for the products API service.

## Tech Stack

![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-0064a5?logo=postgresql&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/-Express-DCDCDC?logo=express&logoColor=black&style=for-the-badge)
![Node](https://img.shields.io/badge/-Node-9ACD32?logo=node.js&logoColor=white&style=for-the-badge)
![NGINX](https://img.shields.io/badge/-NGINX-009900?logo=nginx&logoColor=white&style=for-the-badge)
![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge)
![AWS](https://img.shields.io/badge/-AWS-232F3E?logo=amazonaws&logoColor=white&style=for-the-badge)
![Jest](https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white&style=for-the-badge)
![AutoCannon](https://img.shields.io/badge/-AutoCannon-696969?logo=autocannon&logoColor=white&style=for-the-badge)
![loader.io](https://img.shields.io/badge/-loader.io-6495ED?logo=loader.io&logoColor=white&style=for-the-badge)

## API Development & Optimization

![products_RDBMS_schema](https://user-images.githubusercontent.com/73789849/168510611-08500d28-2e0f-49c5-8a4a-a936bbd32c07.png)

- Design and evaluate **RDBMS** and **DBMS** and consider tradeoffs: selected **PostgreSQL**

- Performe an **ETL Process** to transfer the full application data set (20M+) into PostgreSQL database

- Optimize queries using **B-tree indexes**, **connecting pooling** and building **aggregate tables**

## Deployment

- Containerize the database and server using Docker
- Set up **NGINX load balancer** with ip_hash method for horizontal scaling and reduce latency by 800%
- Scale microservice to handle 3000 RPS by deploying 3 Node/Express servers and database on **AWS EC2**

## Load & Stress Testing

- Used **AutoCannon** to simulate load on the server in development environment
- Conducted cloud-based performance and stress testing on **loader.io** with randomized product IDs
- Achieved 3000 RPS with latency 10ms with 0% error rate 

| Endpoints  | /:product_id  | /:product_id/styles | /:product_id/related |
| ------------- | ------------- | ------------- | ------------- |
| **Avg res time**  | 4ms  | 5ms  | 4ms  |
| **Min/Max**  | 3/125ms  | 3/88ms  | 3/67ms  |
| **Err rate**  | 0%  | 0%   | 0%  |

## API Endpoints

### `GET /products`
Retrieve a list of products

#### Parameters
| Parameter | Type    | Description                                               |
|-----------|---------|-----------------------------------------------------------|
| page      | Integer | Selects the page of results to return. Default 1.         |
| page_size | Integer | Specifies how many results per page to return. Default 10.|

#### Response
```json
[
    {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": 140
    },
    {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": 69
    },
    {
        "id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": 40
    }
]
```

### `GET /products/:product_id`
Returns all the product level information for a specified product id.

#### Parameters
| Parameter  | Type    | Description                                       |
|------------|---------|---------------------------------------------------|
| product_id | Integer | Required ID of the product for which data should be returned. |

#### Response
```json
{
    "id": 1,
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": 140,
    "features": [
        {
            "feature": "Buttons",
            "value": "Brass"
        },
        {
            "feature": "Fabric",
            "value": "Canvas"
        }
    ]
}
```

### `GET /products/:product_id/styles`
Returns all the styles of the specified product.

#### Parameters
| Parameter  | Type    | Description                                       |
|------------|---------|---------------------------------------------------|
| product_id | Integer | Required ID of the product for which data should be returned |

#### Response
```json
{
    "product_id": "1",
    "results": [
        {
            "style_id": 1,
            "name": "Forest Green & Black",
            "original_price": 140,
            "sale_price": null,
            "default?": true,
            "photos": [
                {
                    "url": "placeholder/image.jpg",
                    "thumbnail_url": "placeholder/image_thumbnail.jpg"
                },
                {
                    "url": "placeholder/image.jpg",
                    "thumbnail_url": "placeholder/image_thumbnail.jpg"
                }
            ],
            "skus": {
                "1": {
                    "quantity": 8,
                    "size": "XS"
                },
                "2": {
                    "quantity": 16,
                    "size": "S"
                }
            }
        },
        {
            "style_id": 2,
            "name": "Desert Brown & Tan",
            "original_price": 140,
            "sale_price": null,
            "default?": false,
            "photos": [
                {
                    "url": "placeholder/image.jpg",
                    "thumbnail_url": "placeholder/image_thumbnail.jpg"
                },
                {
                    "url": "placeholder/image.jpg",
                    "thumbnail_url": "placeholder/image_thumbnail.jpg"
                }
            ],
            "skus": {
                "7": {
                    "quantity": 16,
                    "size": "S"
                },
                "8": {
                    "quantity": 8,
                    "size": "XS"
                }
            }
        }
    ]
}
```

### `GET /products/:product_id/related`
Returns the product ids related to the specified product.

#### Parameters
| Parameter  | Type    | Description                                       |
|------------|---------|---------------------------------------------------|
| product_id | Integer | Required ID of the product for which data should be returned |

#### Response
```json
[
  3,
  5,
  9,
  8
]
```

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
