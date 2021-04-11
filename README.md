# sashikanth-k-acceleratorapp-api

## Quick Start

```
git clone https://github.com/Sashikanth-K/sashikanth-k-acceleratorapp-api.git backend
cd backend
docker-compose build
docker-compose up
```

## Runing locally

```
git clone https://github.com/Sashikanth-K/sashikanth-k-acceleratorapp-api.git backend
cd backend
npm install
npm run dev
```

## API

```
http://localhost:5000/directory?directoryPath=/
```

- routePath : '/directory',
- required Query params : '?directoryPath=',
- optional Query params : 'page=1&limit=10'

## Examples

**1**

```
Request

http://localhost:5000/directory?directoryPath=/
```

```
Response

{
  "total": 18,
  "page": 1,
  "totalPages": 2,
  "limit": 10,
  "list": [
    {
      "name": "bin",
      "directory": "/",
      "size": "4.0 KB",
      "fullPath": "/bin",
      "createdDate": "2021-04-11T19:38:27.385Z"
    },
    ...
    ...
    ...
    ,
  ]
}
```

**2**

```
Request

http://localhost:5000/directory?directoryPath=/djhvb          // not a directory
```

```
Response

{
  "code": 400,
  "message": "No such file or directory",
}
```
