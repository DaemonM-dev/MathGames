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

        const assetEntries = Array.from(this.assets.entries());

        for(let i = 0; i < assetEntries.length; i++)
        {
            const entryName = assetEntries[i][0];
            this.loadAsset(entryName);
        }
    }

    loadAsset(name){
        const asset = this.assets.get(name);
        if(!asset || asset.loaded){return;}

        const img = new Image();

        img.onload = () => {
            asset.data = img;
            asset.loaded = true;
            this.loadedCount++;
        };

        img.onerror = () => {
            console.error(`Failed to load asset: ${name}`);
            this.loadedCount++;
        };
        img.src = asset.filepath;
    }

    getAsset(name){
        const asset = this.assets.get(name);
        return asset?.data || null;
    }

    areAllAssetsLoaded(){
        return this.loadedCount === this.loadingCount && this.loadingCount > 0;
    }

    createAssetEntries(){
        this.addAsset('background', 'MathGames/assets/background.png');
        this.addAsset('boy', 'MathGames/assets/boy.png');
        this.addAsset('girl', 'MathGames/assets/girl.png');
        this.addAsset('chocolatecake', 'MathGames/assets/chocolatecake.png');
        this.addAsset('cupcakes', 'MathGames/assets/cupcakes.png');
        this.addAsset('fruitbowl', 'MathGames/assets/fruitbowl.png');
        this.addAsset('fruitcake', 'MathGames/assets/fruitcake.png');
        this.addAsset('mintcake', 'MathGames/assets/mintcake.png');
        this.addAsset('onigiri', 'MathGames/assets/onigiri.png');
        this.addAsset('salad', 'MathGames/assets/salad.png');
        this.addAsset('tofu', 'MathGames/assets/tofu.png');
    }
}