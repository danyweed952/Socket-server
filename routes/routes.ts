import {Router, Request, Response} from 'express';
import Server from '../clases/server';

//constante para crear servicios REST
const router = Router();


// Crear Servicio de prueba

router.get('/mensajes', (req:Request , res:Response) =>{

    res.json({
        ok: true,
        mensaje: 'todo esta bien'
    });
});

router.post('/mensajes', (req:Request , res:Response) =>{
 
    // req.body con esto rescatados lo que venga del body

   const cuerpo = req.body.cuerpo;
   const de = req.body.de;
  
   const payload = { cuerpo, de};
  
const server = Server.instance;
   server.io.emit('mensaje-nuevo',payload);
    res.json({
        ok: true,
        mensaje: 'todo esta bien post',
        cuerpo,
        de
       
    });
});

router.post('/mensajes/:id', (req:Request , res:Response) =>{
 
    // req.params con esto rescatados lo que venga de los parametros en este caso el id
    const cuerpo = req.body.cuerpo;
   const de = req.body.de;
  
   const id = req.params.id;
 const payload = { 
     de,
     cuerpo
 }

   const server = Server.instance;

   server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        mensaje: 'todo esta bien post',
        id
       
    });
});

export default router;

