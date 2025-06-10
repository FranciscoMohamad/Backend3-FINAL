import  express  from 'express';
import passport from './config/passport-config.js';
import sessionRouter from './routes/session-router.js';
import { create } from 'express-handlebars';
import { initMongoDB } from './daos/mongodb/connection.js';
import { errorHandler } from './middlewares/error-handler.js';
import productRouter from './routes/product-router.js';
import userRouter from './routes/user-router.js';
import cartRouter from './routes/cart-router.js';
import viewRouter from './routes/view-router.js';
import mocksRouter from './routes/mocks-router.js';

const app = express();

// Handlebars
const hbs = create({
  extname: '.hbs',
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './src/views');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/products', productRouter)
app.use('/api/users', userRouter);
app.use('/api/carts', cartRouter);
app.use('/api/mocks', mocksRouter);
app.use('/', viewRouter);
app.use('/products', viewRouter);
app.use('/api/sessions', sessionRouter);

app.use(errorHandler) //siempre colocar despues del enrutador

initMongoDB()
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.log(error));

app.listen(8080, () => console.log('Server listening in port 8080'));
