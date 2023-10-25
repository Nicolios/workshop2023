<script>
import axios from "axios";

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
            const vege = document.querySelector('input[name="vege"]:checked') ? document.querySelector('input[name="vege"]:checked').value : null;
            const togoodtogo = document.querySelector('input[name="togoodtogo"]:checked') ? document.querySelector('input[name="togoodtogo"]:checked').value : null;
            const recycl = document.querySelector('input[name="recycl"]:checked') ? document.querySelector('input[name="recycl"]:checked').value : null;
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
            axios
                .post('http://192.168.251.221:8081/trucks', {
                    name: name,
                    address: address,
                    avgNrjMachine: energyScore,
                    critair: critAir,
                    offerVege: vege === 'yes_vege',
                    avgSupplierDistance: distanceProducts,
                    useToGoodToGo: togoodtogo === 'yes_togoodtogo',
                    useRecyclableUstensil: recycl === 'yes_recycl',
                    ville: 'Montpellier',
                    url: 'blabla.com'
                })
                .then((response) => {
                console.log(response)
            })
                .catch((error) => {
                    console.error(error)
                })
        }
    }
}
</script>

<template>
    <div>
        <h1>Formulaire de création d'un foodtruck</h1>
        <div class="form">
            <input id="name" type="text" placeholder="Nom du foodtruck" required>
            <input id="address_autocomplete" type="text" placeholder="Adresse du foodtruck" required>
            <input id="energy-score" type="text" placeholder="Score énergie machines utilisées">
            <select name="critair" id="critair" required>
                <option value="">Choisir un Crit'Air</option>
                <option value="0">Électrique</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <input id="distance_products" type="number" placeholder="Distance provenance des produits">
            <div>
                <h1 style="font-size: 15px">Offre végé ?</h1>
                <div class="option">
                    <div class="option-radio">
                        <input id="yes_vege" name="vege" type="radio" value="yes_vege">
                        <label for="yes_vege">Oui</label>
                    </div>
                    <div class="option-radio">
                        <input id="no_vege" name="vege" type="radio" value="no_vege">
                        <label for="no_vege">Non</label>
                    </div>
                </div>
            </div>
            <div>
                <h1 style="font-size: 15px">Utilisateur toGoodToGo ?</h1>
                <div class="option">
                    <div class="option-radio">
                        <input id="yes_togoodtogo" name="togoodtogo" type="radio" value="yes_togoodtogo">
                        <label for="yes_togoodtogo">Oui</label>
                    </div>
                    <div class="option-radio">
                        <input id="no_togoodtogo" name="togoodtogo" type="radio" value="no_togoodtogo">
                        <label for="no_togoodtogo">Non</label>
                    </div>
                </div>
            </div>
            <div>
                <h1 style="font-size: 15px">Ustensils recyclables ?</h1>
                <div class="option">
                    <div class="option-radio">
                        <input id="yes_recycl" name="recycl" type="radio" value="yes_recycl">
                        <label for="yes_recycl">Oui</label>
                    </div>
                    <div class="option-radio">
                        <input id="no_recycl" name="recycl" type="radio" value="no_recycl">
                        <label for="no_recycl">Non</label>
                    </div>
                </div>
            </div>
            <input id="distance_parking_sell" type="number" placeholder="Distance lieu garage/vente">
            <button @click="createFoodtruck">Envoyer</button>
        </div>
    </div>
</template>

<style>
.form {
    display: flex;
    flex-direction: column;
    max-width: 260px;
    gap: 10px;
}
.option{
    display: flex;
}
.option-radio{
    display: flex;
    align-items: flex-start;
}
</style>
