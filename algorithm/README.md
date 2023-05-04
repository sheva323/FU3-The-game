# Algoritmo para un juego de fut

## Hecho:

- [x] Funcion para crear equipo
  - [x] Funcion para crear jugador
    - [x] Funcion para generar stats
- [x] Funcion Simular Partido (lo mas importante)
  - [x] Variables: marcador, turno de equipo,
  - [x] Funcion cambiar turno
  - [x] Bucle de 90 iteraciones (90 minutos)
    - [x] Obtener un jugador aleatorio para las jugadas excepto portero
    - [x] Probabilidad de cada jugador para recibir el pase
    - [x] Definir receptor si el pase es exitoso de lo contrario siguiente turno para el proximo equipo
    - [x] Si el receptor no es un delantero entonces pasa al siguiente turno
    - [x] Probabilidad de regate, si se falla pasa al siguiente turno
    - [x] Probabilidad de tiro, si se falla pasa al siguiente turno
    - [x] Return un objeto con un ganador y los resultados (ambos string)
- [x] Funcion para simular varios partidos y obtener datos del partido

---

## Pendiente:

- [x] Probabilidad de que el portero ataje (agregar variables de cada portero fuera del bucle)
- [ ] Probabilidad mejorada de tiro (buen tiro, tiro fallido etc)
- [x] Si el pase llega a un jugador con posicion izquierda o derecha entonces
  - [x] Realizar un centro (agregar probabilidad de centro)
  - [ ] Si recibe la pelota un compañero definicion (otra probabilidad con menos chances ya que es con la cabeza)
- [x] Agregar fatiga por cada jugada
- [ ] Mejorar la creacion del jugador dependiendo de la posicion (esto es para mejores simulaciones ya que los jugadores son aleatorios pero se asemejaria a algo mas real)
- [ ] Agregar estamina al algoritmo y tenerlo en cuenta, restar cada vez que se hace alguna jugada tanto portero como jugador
- [ ] Separar obtener datos del partido de la simulacion en otra funcion, luego utilizarlo ahi pero que sea agnostico a lo que pasa
