# Open Tracker Backend

Este repositorio contiene el código fuente del backend del proyecto de
seguimiento del Congreso desarrollado por Open politica.

## ¿Cómo usarlo?

Para utilizar este proyecto se debe clonar el repositorio y contar con una
instalación de nodejs.

Luego, en un archivo de variables de entorno `.env` se deben ingresar las siguientes:

| Variable     | Default    |
| -------------| ---------- |
| DB_USERNAME  | (none)     |
| DB_PASSWORD  | (none)     |
| DB_NAME      | (none)     |
| DB_HOSTNAME  | (none)     |

Finalmente, se puede iniciar el backend mediante la siguiente instrucción:
```
npm dev
```


## Licencia

Copyright 2021 OpenPolitica

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	 http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
