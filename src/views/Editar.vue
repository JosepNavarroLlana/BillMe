<template>
    <div class="caixa">
        <span v-if="balance < 0" style="color: red;">Balance actual: {{ balance.toFixed(2) }} €</span>
        <span v-else>Balance actual: {{ balance.toFixed(2) }} €</span>
        <span>Total ingresos: {{ totalIngresos.toFixed(2) }} €</span>
        <span>Total gastos: {{ totalGastos.toFixed(2) }} €</span>
    </div>

    <div class="movimientos">
        <div class="cabecera">
            <h2>Lista de Movimientos</h2>
            <div class="filtros">
                <label>Filtrar por:</label>
                <select v-model="ordenTipo" v-on:change="actualizarMovimientos">
                    <option value="todos">Tipo: Todos</option>
                    <option value="ingreso">Ingresos</option>
                    <option value="gasto">Gastos</option>
                </select>
                <select v-model="ordenFecha" v-on:change="actualizarMovimientos">
                    <option value="descendente">Fecha: Más recientes</option>
                    <option value="ascendente">Fecha: Más antiguos</option>
                </select>
            </div>
        </div>

        <div class="tarjeta" v-for="(movimiento, index) in movimientosMostrados" :key="index" :class="movimiento.tipo">
            <div class="tarjeta-contenido">
                <span class="concepto">{{ movimiento.concepto }}</span>
                <div class="cantidad-opciones">
                    <span class="cantidad">
                        <span v-if="movimiento.tipo === 'gasto'">-</span>
                        {{ movimiento.cantidad }} €
                    </span>
                    <div class="opciones">
                        <button v-on:click="editarMovimiento(movimiento)" title="Editar movimiento">&#9999;&#65039;</button>
                        <button v-on:click="eliminarMovimiento(movimiento)" title="Eliminar movimiento">&#x274c;</button>
                    </div>
                </div>
            </div>
            <div class="detalles">
                <span class="tipo">{{ movimiento.tipo.toUpperCase() }}</span>
                <span class="fecha">{{ formatearFecha(movimiento.fecha) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            balance: 0,
            totalIngresos: 0,
            totalGastos: 0,
            movimientos: [],
            movimientosMostrados: [],
            ordenFecha: 'descendente',
            ordenTipo: 'todos'
        }
    },
    mounted() {
        const guardados = localStorage.getItem('movimientos');
        if (guardados) {
            this.movimientos = JSON.parse(guardados);
            this.calcularTotales();
            this.actualizarMovimientos();
        }
    },
    methods: {
        calcularTotales() {
            this.totalIngresos = 0;
            this.totalGastos = 0;
            this.movimientos.forEach(movimiento => {
                if (movimiento.tipo === 'ingreso') {
                    this.totalIngresos += movimiento.cantidad;
                } else {
                    this.totalGastos += movimiento.cantidad;
                }
            });
            this.balance = this.totalIngresos - this.totalGastos;
        },
        formatearFecha(fecha) {
            return new Date(fecha).toLocaleDateString();
        },
        editarMovimiento(movimiento) {
            const index = this.movimientos.indexOf(movimiento);
            this.$router.push({ name: 'Movimiento', query: { editIndex: index } });
        },
        eliminarMovimiento(movimiento) {
            if (confirm("Seguro que quieres eliminar este movimiento?")) {
                const index = this.movimientos.indexOf(movimiento);
                this.movimientos.splice(index, 1);
                localStorage.setItem('movimientos', JSON.stringify(this.movimientos));
                this.calcularTotales();
                this.actualizarMovimientos();
            }
        },
        actualizarMovimientos() {
            if (this.ordenTipo === 'ingreso') {
                this.movimientosMostrados = this.movimientos.filter(m => m.tipo === 'ingreso');
            } else if (this.ordenTipo === 'gasto') {
                this.movimientosMostrados = this.movimientos.filter(m => m.tipo === 'gasto');
            } else {
                this.movimientosMostrados = [...this.movimientos];
            }

            if (this.ordenFecha === 'descendente') {
                this.movimientosMostrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            } else {
                this.movimientosMostrados.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            }
        }
    }
}
</script>

<style scoped>
.caixa {
    border: 3px solid lightgreen;
    padding: 40px;
    border-radius: 10px;
    background: white;
    font-weight: bold;
    margin: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.movimientos {
    padding: 20px 0px 5px 20px;
}

.cabecera {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid lightgreen;
}

.filtros {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-right: 20px;
}

.filtros select {
    padding: 5px 10px;
    border: 2px solid lightgreen;
    border-radius: 25px;
    cursor: pointer;
}

.tarjeta {
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-radius: 10px;
    background: #f9f9f9;
    box-shadow: 1px 1px lightgray;
    margin: 0px 20px 10px 0px;
}

.tarjeta-contenido {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}

.cantidad-opciones {
    display: flex;
    align-items: center;
    gap: 10px;
}

.concepto {
    font-weight: bold;
    font-size: 15px;
}

.cantidad {
    font-weight: bold;
    font-size: 15px;
    margin-right: 20px;
}

.detalles {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: gray;
    margin-right: 20px;
}

.tipo {
    font-size: 12px;
    color: gray;
}

.ingreso {
    border-left: 6px solid green;
    color: green;
}

.gasto {
    border-left: 6px solid red;
    color: red;
}

.opciones {
    display: flex;
    gap: 10px;
}

.opciones button {
    cursor: pointer;
}
</style>
