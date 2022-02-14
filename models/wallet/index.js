

const  db = require('../../config/db')


async function initWallet(payload) {
    try {
        const data = await db.query(`
        WITH cte AS (

            INSERT INTO wallet (owned_by)
            VALUES ($1)
            ON CONFLICT(owned_by) 
            DO NOTHING
            RETURNING *
        )
        
        SELECT * FROM cte
        WHERE EXISTS (SELECT * FROM cte)
        UNION ALL
        SELECT * 
        FROM "wallet" 
        WHERE owned_by = $1
          AND NOT EXISTS (SELECT 1 FROM cte)        
        ;
        
        `,[payload])
        
        return data

    } catch (err) {
        throw(err)
    }
}


async function enableWallet(payload){
    try {
        const data = await db.query(`
        UPDATE wallet SET status = 'enabled', enabled_at = NOW() WHERE id = $1
        AND status = 'disabled' RETURNING *;
        `,[payload])

        return data
    } catch (err) {
        throw(err)
    }
}


async function getWallet(payload){
    try {
        const data = await db.query(`
            SELECT * FROM wallet WHERE id = $1
        `,[payload])

        return data        
    } catch (err) {
        throw(err)
    }
}

async function addWallet(payload){
    try {

        await db.query('BEGIN;')

        const dataInsert = await db.query(`INSERT INTO deposit 
        (deposited_by, status, amount, reference_id)
        VALUES ($1,
         'success', $2, $3) returning *;`,
         [payload.id, payload.amount, payload.reference_id])

        const dataUpdate = await db.query(`UPDATE wallet 
        SET
            balance = balance + $2
        WHERE id = $1;`,
        [payload.id, payload.amount])

        await db.query('COMMIT;')


        return dataInsert
    } catch (err) {
        await db.query('ROLLBACK;')
        throw(err)
    }
}


async function useWallet(payload){
    try {

        await db.query('BEGIN;')

        const dataInsert = await db.query(`INSERT INTO withdrawal 
        (withdrawn_by, status, amount, reference_id)
        VALUES ($1,
         'success', $2, $3) returning *;`,
         [payload.id, payload.amount, payload.reference_id])

        const dataUpdate = await db.query(`UPDATE wallet 
        SET
            balance = balance - $2
        WHERE id = $1;`,
        [payload.id, payload.amount])

        await db.query('COMMIT;')


        return dataInsert
    } catch (err) {
        await db.query('ROLLBACK;')
        throw(err)
    }
}

async function disableWallet(payload){
    try {

        const data = await db.query(`
            UPDATE wallet SET status = 'disabled'
                WHERE id = $1 RETURNING *;
        `,[payload])


        return data
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    initWallet,
    enableWallet,
    getWallet,
    addWallet,
    useWallet,
    disableWallet
}