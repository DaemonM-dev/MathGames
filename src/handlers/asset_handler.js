export class AssetHandler{
    constructor(){
        this.assets = new Map();
        this.loadingCount = 0;
        this.loadedCount = 0;
        this.isLoading = false;

        this.createAssetEntries();
    }

    assetUrl(fileName){
        return new URL(`../assets/${fileName}`, import.meta.url).href;
    }

    addAsset(name, filepath){
        this.assets.set(name, {
            filepath: filepath,
            loaded:false,
            data: null
        });
        this.loadingCount++;
    }

    loadAll(){
        console.log("Starting to load assets...");
        this.isLoading = true;
        const assetEntries = Array.from(this.assets.entries());

        for(let i = 0; i < assetEntries.length; i++) {
            const entryName = assetEntries[i][0];
            console.log(`Loading asset: ${entryName} from ${assetEntries[i][1].filepath}`);
            this.loadAsset(entryName);
        }
    }

    loadAsset(name){
        const asset = this.assets.get(name);
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

    getAsset(name){
        const asset = this.assets.get(name);
        if (!asset) {
            console.error(`Asset not found: ${name}`);
            return null;
        }
        return asset.data || null;
    }

    areAllAssetsLoaded(){
        return this.loadedCount === this.loadingCount && this.loadingCount > 0;
    }

    createAssetEntries(){
        this.addAsset('background', this.assetUrl('background.png'));
        this.addAsset('boy', this.assetUrl('boy.png'));
        this.addAsset('girl', this.assetUrl('girl.png'));
        this.addAsset('chocolatecake', this.assetUrl('chocolatecake.png'));
        this.addAsset('cupcakes', this.assetUrl('cupcakes.png'));
        this.addAsset('fruitbowl', this.assetUrl('fruitbowl.png'));
        this.addAsset('fruitcake', this.assetUrl('fruitcake.png'));
        this.addAsset('mintcake', this.assetUrl('mintcake.png'));
        this.addAsset('onigiri', this.assetUrl('onigiri.png'));
        this.addAsset('salad', this.assetUrl('salad.png'));
        this.addAsset('tofu', this.assetUrl('tofu.png'));
        this.addAsset('kuro', this.assetUrl('kuro.png'));
        this.addAsset('sign', this.assetUrl('sign.png'));
        this.addAsset('menuboard', this.assetUrl('menuboard.png'));
        this.addAsset('goodjob1', this.assetUrl('goodjob1.png'));
        this.addAsset('goodjob2', this.assetUrl('goodjob2.png'));
        this.addAsset('goodjob3', this.assetUrl('goodjob3.png'));
        this.addAsset('tryagain1', this.assetUrl('tryagain1.png'));
        this.addAsset('dialogueright', this.assetUrl('dialogueright.png'));
        this.addAsset('dialogueleft', this.assetUrl('dialogueleft.png'));
        this.addAsset('coupon', this.assetUrl('coupon.png'));
    }
}