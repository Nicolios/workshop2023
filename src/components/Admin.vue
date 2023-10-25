<script>
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import 'vue-toast-notification/dist/theme-sugar.css';
import VueToast from 'vue-toast-notification';
import router from "../router";

export default {
    name: 'Admin',
    mounted() {
        const address_input = document.getElementById('address_autocomplete')
        const autocomplete = new google.maps.places.Autocomplete(address_input,{
            fields: ["address_components", "geometry", "name"],
            types: ["address"],
        });
    },
    methods: {
        createFoodtruck(){
            const name = document.getElementById('name').value
            const address = document.getElementById('address_autocomplete').value
            const energyScore = document.getElementById('energy-score').value
            const critAir = document.getElementById('critair').value
            const distanceProducts = document.getElementById('distance_products').value
            const vege = document.getElementById('isvege').checked
            const togoodtogo = document.getElementById('useTGTG').checked
            const recycl = document.getElementById('userecycle').checked
            const url = document.getElementById('url').value
            // const vege = document.querySelector('input[name="vege"]:checked') ? document.querySelector('input[name="vege"]:checked').value : null;
            // const togoodtogo = document.querySelector('input[name="togoodtogo"]:checked') ? document.querySelector('input[name="togoodtogo"]:checked').value : null;
            // const recycl = document.querySelector('input[name="recycl"]:checked') ? document.querySelector('input[name="recycl"]:checked').value : null;
            // const distanceParking = document.getElementById('distance_parking_sell').value
            // console.log(name)
            // console.log(address)
            // console.log(energyScore)
            // console.log(critAir)
            // console.log(distanceProducts)
            // console.log(vege)
            // console.log(togoodtogo)
            // console.log(recycl)
            // console.log(distanceParking)
            const headers = {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    };
            axios
                .post(import.meta.env.VITE_API_URL+'trucks', {
                    name: name,
                    address: address,
                    avgNrjMachine: energyScore,
                    critair: critAir,
                    offerVege: vege,
                    avgSupplierDistance: distanceProducts,
                    useToGoodToGo: togoodtogo,
                    useRecyclableUstensil: recycl,
                    url: url
                }, {headers})
                .then((response) => {
                    router.push('/maps')
                })
                .catch((error) => {
                   this.$toast.error("Une erreur est survenue")
                })
        }
    },
    components: {
        VueToast,
    },
};
</script>

<template>
    <div class="body">
        <h1>Formulaire de création d'un foodtruck</h1>
        <div class="form">
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Nom</span>
                <input id="name" type="text" placeholder="Nom du food-truck" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Adresse</span>
                <input id="address_autocomplete" placeholder="Selectionner une adresse" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">Score energie moyen</label>
                <select class="form-select" id="energy-score">
                    <option selected value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>
            </div>

            <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">Crit'air du véhicule</label>
                <select class="form-select" id="critair">
                    <option value="0">Electrique</option>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>

            <div class="mb-3">
                <div class="input-group">
                    <span class="input-group-text" id="basic-addon3">Site internet</span>
                    <input type="text" placeholder="https://www.mon-site-est-parfait.fr/" class="form-control" id="url" aria-describedby="basic-addon3 basic-addon4">
                </div>
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Distance provenance des produits</span>
                <input id="distance_products" type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>

            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="isvege" checked>
                <label class="form-check-label" for="flexSwitchCheckChecked">Prosose une offre végétarienne</label>
            </div>


            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="useTGTG" checked>
                <label class="form-check-label" for="flexSwitchCheckChecked">Utilise toGoodToGo</label>
            </div>

            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="userecycle" checked>
                <label class="form-check-label" for="flexSwitchCheckChecked">Utilise des ustensils recyclables</label>
            </div>

        
            <div class="input-group mb-3">
                <span class="input-group-text" id="inputGroup-sizing-default">Distance lieu garage/vente</span>
                <input id="distance_parking_sell" type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            <button type="button" class="btn btn-primary" id="valid" @click="createFoodtruck">Valider</button>
            <vue-toast></vue-toast>
        </div>
    </div>
</template>

<style>

.body {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

body h1 {
    margin-bottom: 35px;
}

.form {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    min-width: 250px;
    width: 100%;
    gap: 10px;
}
.option{
    display: flex;
}
.option-radio{
    display: flex;
    align-items: flex-start;
}

#valid{
    margin-bottom: 35px;
}
</style>
