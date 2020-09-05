export const noop = () => {}

export const getFilePaths = (dir, fs) => {
    const make = (dir, acc = []) => fs.readdirSync(dir).reduce((acc, file) => {
      const filepath = `${dir}/${file}`
      if(fs.statSync(filepath).isDirectory()) return make(filepath, acc)
      return [...acc, filepath]
    },acc)
    return make(dir)
  }
  