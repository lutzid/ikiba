<template>
    <div id="container">
        <div>
            <div v-if="isEdit">
                <button id="back-edit" @click="stateEdit">back</button>
            </div>
            <div v-else>
                <button id="add" @click="stateAdd">{{ nameSwitcher }}</button>
            </div>
        </div>
        <br>
        <h3>Detail</h3>
        <div id="coord">
            <label>Latitude: {{lat}} </label> <br>
            <label>Longitude: {{lon}} </label>
        </div>
        <div class="navigation">
            <div
                class="nav-item"
                v-for="layer in layers"
                :key="layer.id"
            >
                <label class="form-check-label">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="layer.active"
                        @change="layerChanged(layer.id, layer.active)"
                    />
                    {{ layer.name }}
                </label>
            </div>
        </div>
        <div v-if="isEdit">
            <h3>Edit Place</h3>
                <form @submit.prevent="update">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input class="form-control" type="text" name="name" v-model="updated.name">
                </div>
                <div class="form-group">
                    <label for="kind">Kind</label>
                    <select class="form-control" id="kind" name="kind" v-model="updated.kind">
                        <option value="Restaurants">Restaurants</option>
                        <option value="Hotels">Hotels</option>
                        <option value="Recreations">Recreations</option>
                        <option value="Malls">Malls</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="latitude">Latitude</label>
                    <input class="form-control" type="number" step="any" name="latitude" id="latitude" ref="lon" v-model="updated.lat">
                </div>
                <div class="form-group">
                    <label for="longitude">Longitude</label>
                    <input class="form-control" type="number" step="any" name="longitude" id="longitude" ref="lon" v-model="updated.lon">
                </div>
                <button class="btn btn-primary" type="submit">Save</button>
                </form>
        </div>
        <div v-else>
            <div v-if="!isAdd">
                <h3>List</h3>
                <div>
                    <input type="text" v-model="search" placeholder="search" id="search"/>
                </div>
                <br>
                <div id="list">
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="item in searchedPlaces"
                                :key="item.id"
                            >
                                <td>{{ item.id }}</td>
                                <td>{{ item.name }}</td>
                                <td>
                                    <button @click="route(item.lat, item.lon)">Rute</button>
                                    <button @click="edit(item)">Edit</button>
                                    <button @click="del(item.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else>
                <h3>Add Place</h3>
                <form @submit.prevent="submit">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" name="name" v-model="name">
                </div>
                <div>
                    <label for="kind">Kind</label>
                    <select id="kind" name="kind" v-model="kind">
                        <option value="Restaurants">Restaurants</option>
                        <option value="Hotels">Hotels</option>
                        <option value="Recreations">Recreations</option>
                        <option value="Malls">Malls</option>
                    </select>
                </div>
                <div>
                    <label for="latitude">Latitude</label>
                    <input type="number" step="any" name="latitude" id="latitude" ref="lon" v-model="lat">
                </div>
                <div>
                    <label for="longitude">Longitude</label>
                    <input type="number" step="any" name="longitude" id="longitude" ref="lon" v-model="lon">
                </div>
                <button type="submit">Save</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script src="./js/detail.js"/>

<style scoped>
    #container {
        height: 100%;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        background:rgba(255, 255, 255, 0.6);
        position: absolute;
        z-index: 3;
        width: 408px;
        top: 0;
        left: 0;
        flex: 1;
    }
    table {
        margin: 10px;
        border-collapse: collapse;
        text-align: left;
    }
    table, th, td {
        border: 1px solid black;
    }
    td {
        padding: 5px;
    }
    #add {
        float: right;
        margin: 5px;
    }
    #back-edit {
        float: right;
        margin: 5px;
    }
    #coord {
        margin-bottom: 10px;
        flex: 1;
    }
    .navigation {
        text-align: left;
        padding-left: 35%;
        flex: 1;
        flex-direction: row;
    }
    .nav-item {
        flex-direction: column;
    }
    #search {
        float: left;
        margin-left: 10px;
    }
</style>