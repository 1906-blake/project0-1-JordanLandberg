import epxress from 'express';
import bodyParser from 'body-parser';
import { usersRouter } from './routers/users.router';
import { reimbursementsRouter } from './routers/reimbursements.router';
import { authRouter } from './routers/auth.router';
import { sessionMiddleware } from './middleware/session.middleware';

const port = process.env.PORT || 8012;
const app = epxress();

app.use((req, res, next) => {
    console.log(`request made with url: ${req.url} and method ${req.method}`)
    next();
})

app.use(bodyParser.json());

/**
 * Session middleware to give us access to req.session for session data
 */
app.use(sessionMiddleware);

/*******************************
 * Register Routers
 *******************************/
app.use('/users', usersRouter);
app.use('/reimbursements', reimbursementsRouter);
app.use(authRouter);

app.listen(port, () => {
    console.log(`app started on port: ${port}`);
})