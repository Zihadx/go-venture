import Image from 'next/image';


const ImageLayout = ({destinationData}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {destinationData.image.length === 4 && (
              <>
                <div className="col-span-12 md:col-span-8">
                  <Image
                    src={destinationData.image[0]}
                    alt={destinationData.image[0]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-12 md:col-span-4">
                  <Image
                    src={destinationData.image[1]}
                    alt={destinationData.image[1]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <Image
                    src={destinationData.image[2]}
                    alt={destinationData.image[2]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-6 md:col-span-8">
                  <Image
                    src={destinationData.image[3]}
                    alt={destinationData.image[3]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </>
            )}

            {destinationData.image.length === 3 && (
              <>
                <div className="col-span-12">
                  <Image
                    src={destinationData.image[0]}
                    alt={destinationData.image[0]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-6 md:col-span-6">
                  <Image
                    src={destinationData.image[1]}
                    alt={destinationData.image[1]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div className="col-span-6 md:col-span-6">
                  <Image
                    src={destinationData.image[2]}
                    alt={destinationData.image[2]}
                    width={400}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </>
            )}
          </div>
    );
};

export default ImageLayout;