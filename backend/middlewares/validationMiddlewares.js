const validationFields = (schema) => async (req, res, next) => {
    const body = req.body;
    try {
        await schema.validate(body, { abortEarly: false })
        // next();
        return next();
    }
    catch (error) {
        const errors = error.inner.map((err) => ({
            path: err.path,
            message: err.message,
            value: err.params.originalValue,
        }));
        console.error("ERRO YUP", errors)
        return res.status(400).json({ errors });
        // return res.status(400).json({ error: error.errors.join(', ') });
    }
}

module.exports = validationFields;