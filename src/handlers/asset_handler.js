export class AssetHandler{
    constructor(){
        this.assets = new Map();
        this.loadingCount = 0;
        this.loadedCount = 0;
        this.isLoading = false;

        this.createAssetEntries();
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
        this.isLoading = true;
        console.log("Starting to load assets...");

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
            this.loadedCount++;
        };
        
        console.log(`Setting src to: ${asset.filepath}`);
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
        console.log(`Loaded: ${this.loadedCount}/${this.loadingCount}`);
        return this.loadedCount === this.loadingCount && this.loadingCount > 0;
    }

    createAssetEntries(){
        // Try multiple path variations
        const basePath = './src/assets/'; // Relative path
        
        this.addAsset('background', basePath + 'background.png');
        this.addAsset('boy', basePath + 'boy.png');
        this.addAsset('girl', basePath + 'girl.png');
        this.addAsset('chocolatecake', basePath + 'chocolatecake.png');
        this.addAsset('cupcakes', basePath + 'cupcakes.png');
        this.addAsset('fruitbowl', basePath + 'fruitbowl.png');
        this.addAsset('fruitcake', basePath + 'fruitcake.png');
        this.addAsset('mintcake', basePath + 'mintcake.png');
        this.addAsset('onigiri', basePath + 'onigiri.png');
        this.addAsset('salad', basePath + 'salad.png');
        this.addAsset('tofu', basePath + 'tofu.png');
        this.addAsset('money', basePath + 'money.png');
        this.addAsset('sign', basePath + 'sign.png');
    }
}