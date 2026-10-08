const assetUrls = {
    'cloud1.png': new URL('../assets/cloud1.png', import.meta.url).href,
    'cloud2.png': new URL('../assets/cloud2.png', import.meta.url).href,
    'boy.png': new URL('../assets/boy.png', import.meta.url).href,
    'girl.png': new URL('../assets/girl.png', import.meta.url).href,
    'chocolatecake.png': new URL('../assets/chocolatecake.png', import.meta.url).href,
    'cupcakes.png': new URL('../assets/cupcakes.png', import.meta.url).href,
    'fruitbowl.png': new URL('../assets/fruitbowl.png', import.meta.url).href,
    'fruitcake.png': new URL('../assets/fruitcake.png', import.meta.url).href,
    'mintcake.png': new URL('../assets/mintcake.png', import.meta.url).href,
    'onigiri.png': new URL('../assets/onigiri.png', import.meta.url).href,
    'salad.png': new URL('../assets/salad.png', import.meta.url).href,
    'tofu.png': new URL('../assets/tofu.png', import.meta.url).href,
    'kuro.png': new URL('../assets/kuro.png', import.meta.url).href,
    'sign.png': new URL('../assets/sign.png', import.meta.url).href,
    'coupon.png': new URL('../assets/coupon.png', import.meta.url).href,
    'dialogueleft.png': new URL('../assets/dialogueleft.png', import.meta.url).href,
    'dialogueright.png': new URL('../assets/dialogueright.png', import.meta.url).href,
    'english/background_english.png': new URL('../assets/english/background_english.png', import.meta.url).href,
    'english/gameover_english.png': new URL('../assets/english/gameover_english.png', import.meta.url).href,
    'english/goodjob1_english.png': new URL('../assets/english/goodjob1_english.png', import.meta.url).href,
    'english/goodjob2_english.png': new URL('../assets/english/goodjob2_english.png', import.meta.url).href,
    'english/goodjob3_english.png': new URL('../assets/english/goodjob3_english.png', import.meta.url).href,
    'english/levelSting_english.png': new URL('../assets/english/levelSting_english.png', import.meta.url).href,
    'english/menuboard_english.png': new URL('../assets/english/menuboard_english.png', import.meta.url).href,
    'english/startMenu_english.png': new URL('../assets/english/startMenu_english.png', import.meta.url).href,
    'english/tryAgain1_english.png': new URL('../assets/english/tryAgain1_english.png', import.meta.url).href,
    'irish/background_irish.png': new URL('../assets/irish/background_irish.png', import.meta.url).href,
    'irish/gameover_irish.png': new URL('../assets/irish/gameover_irish.png', import.meta.url).href,
    'irish/goodjob1_irish.png': new URL('../assets/irish/goodjob1_irish.png', import.meta.url).href,
    'irish/goodjob2_irish.png': new URL('../assets/irish/goodjob2_irish.png', import.meta.url).href,
    'irish/goodjob3_irish.png': new URL('../assets/irish/goodjob3_irish.png', import.meta.url).href,
    'irish/levelSting_irish.png': new URL('../assets/irish/levelSting_irish.png', import.meta.url).href,
    'irish/menuboard_irish.png': new URL('../assets/irish/menuboard_irish.png', import.meta.url).href,
    'irish/startMenu_irish.png': new URL('../assets/irish/startMenu_irish.png', import.meta.url).href,
    'irish/tryAgain1_irish.png': new URL('../assets/irish/tryAgain1_irish.png', import.meta.url).href,
    'audio/click.mp3': new URL('../assets/audio/click.mp3', import.meta.url).href,
    'audio/correct.mp3': new URL('../assets/audio/correct.mp3', import.meta.url).href,
    'audio/incorrect.mp3': new URL('../assets/audio/incorrect.mp3', import.meta.url).href,
    'audio/levelComplete.mp3': new URL('../assets/audio/levelComplete.mp3', import.meta.url).href,
    'audio/pop.mp3': new URL('../assets/audio/pop.mp3', import.meta.url).href,
    'audio/welcome.mp3': new URL('../assets/audio/welcome.mp3', import.meta.url).href,
};

export class AssetHandler{
    constructor(){
        this.menuAssets     = new Map();
        this.assets         = new Map();
        this.englishAssets  = new Map();
        this.irishAssets    = new Map();

        this.sounds         = new Map();

        this.loadingCount   = 0;
        this.loadedCount    = 0;
        this.isLoading      = false;

        this.createAssetEntries();
    }

    assetUrl(fileName){
        const url = assetUrls[fileName];
        if (!url) {
            console.error(`Missing asset: ${fileName}`);
        }
        return url;
    }

    addAsset(name, filepath){
        this.assets.set(name, {
            filepath: filepath,
            loaded: false,
            data: null
        });
        this.loadingCount++;
    }
    addMenuAsset(name, filepath){
        console.log(`Adding menu asset: ${name} from ${filepath}`);
            this.menuAssets.set(name, {
            filepath: filepath,
            loaded: false,
            data: null
        });
        this.loadingCount++;
    }
    addEnglishAsset(name, filepath){
        this.englishAssets.set(name, {
            filepath: filepath,
            loaded: false,
            data: null
        });
        this.loadingCount++;
    }
    addIrishAsset(name, filepath){
        this.irishAssets.set(name, {
            filepath: filepath,
            loaded: false,
            data: null
        });
        this.loadingCount++;
    }

    addSound(name, filepath){
        this.sounds.set(name, {
            filepath: filepath,
            loaded: false,
            data: null
        });
        this.loadingCount++;
    }

    loadAll(){
        console.log("Starting to load assets...");
        this.isLoading = true;
        // Load all asset types
        this.loadMenuAssets();
        this.loadEnglishAssets();
        this.loadIrishAssets();
        this.loadAssets();
        this.loadSounds();
    }

    loadSounds(){
        console.log("Loading sounds...");
        const assetEntries = Array.from(this.sounds.entries());
        for(let i = 0; i < assetEntries.length; i++)
        {
            const entryName = assetEntries[i][0];
            console.log(`Loading sound: ${entryName} from ${assetEntries[i][1].filepath}`);
            this.loadSoundFromMap(entryName, this.sounds);
        }
    }

    loadMenuAssets(){
        console.log("Loading menu assets...");
        const assetEntries = Array.from(this.menuAssets.entries());
        
        for(let i = 0; i < assetEntries.length; i++) {
            const entryName = assetEntries[i][0];
            console.log(`Loading menu asset: ${entryName} from ${assetEntries[i][1].filepath}`);
            this.loadAssetFromMap(entryName, this.menuAssets);
        }
    }

    loadEnglishAssets(){
        console.log("Loading English assets...");
        const assetEntries = Array.from(this.englishAssets.entries());
        
        for(let i = 0; i < assetEntries.length; i++) {
            const entryName = assetEntries[i][0];
            console.log(`Loading English asset: ${entryName} from ${assetEntries[i][1].filepath}`);
            this.loadAssetFromMap(entryName, this.englishAssets);
        }
    }

    loadIrishAssets(){
        console.log("Loading Irish assets...");
        const assetEntries = Array.from(this.irishAssets.entries());
        
        for(let i = 0; i < assetEntries.length; i++) {
            const entryName = assetEntries[i][0];
            console.log(`Loading Irish asset: ${entryName} from ${assetEntries[i][1].filepath}`);
            this.loadAssetFromMap(entryName, this.irishAssets);
        }
    }

    loadAssets(){
        console.log("Loading game assets...");
        const assetEntries = Array.from(this.assets.entries());
        
        for(let i = 0; i < assetEntries.length; i++) {
            const entryName = assetEntries[i][0];
            console.log(`Loading asset: ${entryName} from ${assetEntries[i][1].filepath}`);
            this.loadAssetFromMap(entryName, this.assets);
        }
    }

    loadAssetFromMap(name, assetMap){
        const asset = assetMap.get(name);
        if(!asset || asset.loaded){ 
            console.log(`Skipping load for ${name}`);
            return;
        }

        const img = new Image();

        img.onload = () => {
            asset.data = img;
            asset.loaded = true;
            this.loadedCount++;
            console.log(`Successfully loaded: ${name}`);
        };

        img.onerror = (error) => {
            console.error(`Failed to load asset: ${name}`, error);
            console.error(`File path attempted: ${asset.filepath}`);
        };
        img.src = asset.filepath;
    }


    loadSoundFromMap(name, assetMap){
        const asset = assetMap.get(name);
        if(!asset || asset.loaded){ 
            console.log(`Skipping load for ${name}`);
            return;
        }

        const audio = new Audio();
        audio.preload = 'auto';

        audio.addEventListener('canplaythrough', () => {
            if(asset.loaded) return;

            asset.data = audio;
            asset.loaded = true;
            this.loadedCount++;
            audio.muted = false;
            console.log(`Successfully loaded sound: ${name}`);
        }, { once: true });

        audio.addEventListener('error', (error) => {
            console.error(`Failed to load sound: ${name}`, error);
            console.error(`File path attempted: ${asset.filepath}`);
        }, { once: true });

        audio.src = asset.filepath;
    }

    


    getAsset(name){
        const asset = this.assets.get(name);
        if (!asset) {
            console.error(`Asset not found: ${name}`);
            return null;
        }
        return asset.data || null;
    }

    getMenuAsset(name){
        const asset = this.menuAssets.get(name);
        if (!asset) {
            console.error(`Menu asset not found: ${name}`);
            return null;
        }
        return asset.data || null;
    }

    getEnglishAsset(name){
        const asset = this.englishAssets.get(name);
        if (!asset) {
            console.error(`English asset not found: ${name}`);
            return null;
        }
        return asset.data || null;
    }

    getIrishAsset(name){
        const asset = this.irishAssets.get(name);
        if (!asset) {
            console.error(`Irish asset not found: ${name}`);
            return null;
        }
        return asset.data || null;
    }

    getSound(name){
        const asset = this.sounds.get(name);
        if (!asset) {
            console.error(`Sound not found: ${name}`);
            return null;
        }
        return asset.data || null;
    }

    areAllAssetsLoaded(){
        return this.loadedCount === this.loadingCount && this.loadingCount > 0;
    }

    areAllSoundsLoaded(){
        let loadedCount = 0;
        let totalCount = 0;
        
        for(const [name, asset] of this.sounds.entries()) {
            totalCount++;
            if(asset.loaded) {
                loadedCount++;
            }
        }
        return loadedCount === totalCount && totalCount > 0;
    }

    areMenuAssetsLoaded(){
        let loadedCount = 0;
        let totalCount = 0;
        
        for(const [name, asset] of this.menuAssets.entries()) {
            totalCount++;
            if(asset.loaded) {
                loadedCount++;
            }
        }
        
        return loadedCount === totalCount && totalCount > 0;
    }

    areEnglishAssetsLoaded(){
        let loadedCount = 0;
        let totalCount = 0;
        
        for(const [name, asset] of this.englishAssets.entries()) {
            totalCount++;
            if(asset.loaded) {
                loadedCount++;
            }
        }
        
        return loadedCount === totalCount && totalCount > 0;
    }

    areIrishAssetsLoaded(){
        let loadedCount = 0;
        let totalCount = 0;
        
        for(const [name, asset] of this.irishAssets.entries()) {
            totalCount++;
            if(asset.loaded) {
                loadedCount++;
            }
        }
        
        return loadedCount === totalCount && totalCount > 0;
    }

    areGameAssetsLoaded(){
        let loadedCount = 0;
        let totalCount = 0;
        
        for(const [name, asset] of this.assets.entries()) {
            totalCount++;
            if(asset.loaded) {
                loadedCount++;
            }
        }
        
        return loadedCount === totalCount && totalCount > 0;
    }

    createAssetEntries(){
        this.addMenuAsset('startMenu_english',  this.assetUrl('english/startMenu_english.png'));
        this.addMenuAsset('startMenu_irish',    this.assetUrl('irish/startMenu_irish.png'));
        this.addMenuAsset('cloud1',             this.assetUrl('cloud1.png'));
        this.addMenuAsset('cloud2',             this.assetUrl('cloud2.png'));

        this.addEnglishAsset('background_english',  this.assetUrl('english/background_english.png'));
        this.addEnglishAsset('gameover_english',    this.assetUrl('english/gameover_english.png'));
        this.addEnglishAsset('goodjob1_english',    this.assetUrl('english/goodjob1_english.png'));
        this.addEnglishAsset('goodjob2_english',    this.assetUrl('english/goodjob2_english.png'));
        this.addEnglishAsset('goodjob3_english',    this.assetUrl('english/goodjob3_english.png'));
        this.addEnglishAsset('levelSting_english',  this.assetUrl('english/levelSting_english.png'));
        this.addEnglishAsset('menuboard_english',   this.assetUrl('english/menuboard_english.png'));
        this.addEnglishAsset('tryAgain1_english',   this.assetUrl('english/tryAgain1_english.png'));

        this.addIrishAsset('background_irish',  this.assetUrl('irish/background_irish.png'));
        this.addIrishAsset('gameover_irish',    this.assetUrl('irish/gameover_irish.png'));
        this.addIrishAsset('goodjob1_irish',    this.assetUrl('irish/goodjob1_irish.png'));
        this.addIrishAsset('goodjob2_irish',    this.assetUrl('irish/goodjob2_irish.png'));
        this.addIrishAsset('goodjob3_irish',    this.assetUrl('irish/goodjob3_irish.png'));
        this.addIrishAsset('levelSting_irish',  this.assetUrl('irish/levelSting_irish.png'));
        this.addIrishAsset('menuboard_irish',   this.assetUrl('irish/menuboard_irish.png'));
        this.addIrishAsset('tryAgain1_irish',   this.assetUrl('irish/tryAgain1_irish.png'));

        this.addAsset('boy', this.assetUrl('boy.png'));
        this.addAsset('girl', this.assetUrl('girl.png'));
        this.addAsset('chocolatecake', this.assetUrl('chocolatecake.png'));
        this.addAsset('cupcakes', this.assetUrl('cupcakes.png')); // Fixed missing closing parenthesis
        this.addAsset('fruitbowl', this.assetUrl('fruitbowl.png'));
        this.addAsset('fruitcake', this.assetUrl('fruitcake.png'));
        this.addAsset('mintcake', this.assetUrl('mintcake.png'));
        this.addAsset('onigiri', this.assetUrl('onigiri.png'));
        this.addAsset('salad', this.assetUrl('salad.png'));
        this.addAsset('tofu', this.assetUrl('tofu.png'));
        this.addAsset('kuro', this.assetUrl('kuro.png'));
        this.addAsset('sign', this.assetUrl('sign.png'));
        this.addAsset('coupon', this.assetUrl('coupon.png'));
        this.addAsset('dialogueleft', this.assetUrl('dialogueleft.png'));
        this.addAsset('dialogueright', this.assetUrl('dialogueright.png'));

        this.addSound('click', this.assetUrl('audio/click.mp3'));
        this.addSound('correct', this.assetUrl('audio/correct.mp3'));
        this.addSound('incorrect', this.assetUrl('audio/incorrect.mp3'));
        this.addSound('levelComplete', this.assetUrl('audio/levelComplete.mp3'));
        this.addSound('pop', this.assetUrl('audio/pop.mp3'));
        this.addSound('welcome', this.assetUrl('audio/welcome.mp3'));
    }
}
