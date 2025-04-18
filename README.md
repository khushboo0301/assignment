
### 1. Clone the repo

```bash
git clone https://github.com/khushboo0301/assignment.git
cd assignment

#dependencies 
npm install

# postgresql
docker-compose up -d

# to run the docker 
docker build -t 55-technologies-assignment .
docker run -p 5000:5000 55-technologies-assignment

#run 
npm run dev

#unit testing
npx jest
