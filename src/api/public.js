/**
 * Configuracion de las rutas publicas se usa el api key 
* de la carpeta constants
 */
import { apiKey } from '../constants/api';

// eslint-disable-next-line import/prefer-default-export
export const newsList = `${apiKey}/noticias/lista`;
export const newsListSection = `${apiKey}/noticias/seccion`;
export const newsListAuthor = `${apiKey}/noticias/autor`;
export const newsUnique = `${apiKey}/noticia`;